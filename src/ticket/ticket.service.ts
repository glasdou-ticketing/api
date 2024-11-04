import { ConflictException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Role, Ticket } from '@prisma/client';

import { ListResponse, PaginationDto } from 'src/common';
import { ExceptionHandler, hasRoles, ObjectManipulator } from 'src/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/user';
import { CreateTicketDto, UpdateTicketDto } from './dto';
import { TicketResponse } from './interfaces/ticket.interface';

const TICKET_INCLUDE_LIST = {
  createdBy: { select: { id: true, username: true, email: true } },
  department: { select: { name: true, id: true } },
  category: { select: { name: true, id: true } },
  priority: { select: { name: true, id: true } },
  status: { select: { name: true, id: true } },
};

const TICKET_INCLUDE_ONE = {
  ...TICKET_INCLUDE_LIST,
  updatedBy: { select: { id: true, username: true, email: true } },
  deletedBy: { select: { id: true, username: true, email: true } },
};

const EXCLUDE_FIELDS: (keyof Ticket)[] = [
  'createdById',
  'updatedById',
  'deletedById',
  'departmentId',
  'categoryId',
  'priorityId',
  'statusId',
];

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name);
  private readonly exHandler = new ExceptionHandler(this.logger, TicketService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto, user: CurrentUser): Promise<TicketResponse> {
    this.logger.log(`Creating ticket: ${JSON.stringify(createTicketDto)}, user: ${user.id} - ${user.username}`);
    try {
      const departmentId = createTicketDto.departmentId || user.departmentId;

      const newTicket = await this.prisma.ticket.create({
        data: {
          ...createTicketDto,
          departmentId,
          createdById: user.id,
          updatedById: user.id,
        },
        include: TICKET_INCLUDE_ONE,
      });

      return this.excludeFields(newTicket);
    } catch (error) {
      this.exHandler.process(error);
    }
  }

  async findAll(pagination: PaginationDto, user: CurrentUser): Promise<ListResponse<Ticket>> {
    this.logger.log(`Fetching tickets: ${JSON.stringify(pagination)}, user: ${user.id} - ${user.username}`);

    const { page, limit } = pagination;
    const where = this.handleWhere(user);

    const [data, total] = await Promise.all([
      this.prisma.ticket.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where,
        include: TICKET_INCLUDE_LIST,
      }),
      this.prisma.ticket.count({ where }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return { meta: { total, page, lastPage }, data: data.map(this.excludeFields) };
  }

  async findOne(id: string, user: CurrentUser) {
    const where = this.handleWhere(user);

    const ticket = await this.prisma.ticket.findFirst({
      where: { id, ...where },
      include: TICKET_INCLUDE_ONE,
    });

    if (!ticket) throw new NotFoundException({ status: 404, message: `[ERROR] Ticket with id ${id} not found` });

    return this.excludeFields(ticket);
  }

  async update(id: string, updateTicketDto: UpdateTicketDto, user: CurrentUser) {
    this.logger.log(`Updating ticket: ${id}, ${JSON.stringify(updateTicketDto)}, user: ${user.id} - ${user.username}`);
    try {
      await this.findOne(id, user);

      const updatedTicket = await this.prisma.ticket.update({
        where: { id },
        data: { ...updateTicketDto, updatedById: user.id },
        include: TICKET_INCLUDE_ONE,
      });

      return this.excludeFields(updatedTicket);
    } catch (error) {
      this.exHandler.process(error);
    }
  }

  async remove(id: string, user: CurrentUser) {
    this.logger.log(`Deleting ticket: ${id}, user: ${user.id} - ${user.username}`);
    try {
      const ticket = await this.findOne(id, user);

      if (ticket.deletedAt !== null)
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          message: `[ERROR] Ticket with id ${id} is already disabled`,
        });

      const updatedTicket = await this.prisma.ticket.update({
        where: { id },
        data: { deletedAt: new Date(), deletedById: user.id },
        include: TICKET_INCLUDE_ONE,
      });

      return this.excludeFields(updatedTicket);
    } catch (error) {
      this.exHandler.process(error);
    }
  }

  async restore(id: string, user: CurrentUser) {
    this.logger.log(`Restoring ticket: ${id}, user: ${user.id} - ${user.username}`);
    try {
      const ticket = await this.findOne(id, user);

      if (ticket.deletedAt === null)
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          message: `[ERROR] Ticket with id ${id} is already enabled`,
        });

      const updatedTicket = await this.prisma.ticket.update({
        where: { id },
        data: { deletedAt: null, deletedById: null, updatedById: user.id },
        include: TICKET_INCLUDE_ONE,
      });

      return this.excludeFields(updatedTicket);
    } catch (error) {
      this.exHandler.process(error);
    }
  }

  private handleWhere(user: CurrentUser): Partial<Ticket> {
    // Admins and Developers can see all tickets
    if (hasRoles(user.roles, [Role.Admin, Role.Developer])) return {};

    // Managers can see tickets in their department that are not deleted
    if (hasRoles(user.roles, [Role.Manager])) return { deletedAt: null, departmentId: user.departmentId };

    // All other users can see their own tickets that are not deleted
    return { deletedAt: null, createdById: user.id };
  }

  private excludeFields(ticket: Ticket): TicketResponse {
    return ObjectManipulator.exclude<Ticket>(ticket, EXCLUDE_FIELDS) as TicketResponse;
  }
}

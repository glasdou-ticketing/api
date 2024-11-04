import { Injectable, Logger } from '@nestjs/common';

import { PaginationDto } from 'src/common';
import { ExceptionHandler, hasRoles } from 'src/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/user';
import { CreateTicketDto, UpdateTicketDto } from './dto';
import { Role } from '@prisma/client';

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name);
  private readonly exHandler = new ExceptionHandler(this.logger, TicketService.name);

  constructor(private readonly prisma: PrismaService) {}

  create(createTicketDto: CreateTicketDto) {
    return 'This action adds a new ticket';
  }

  async findAll(pagination: PaginationDto, user: CurrentUser) {
    const { page, limit } = pagination;
    const isAdmin = hasRoles(user.roles, [Role.Admin, Role.Developer]);
    const where = isAdmin ? {} : { deletedAt: null };

    const [data, total] = await Promise.all([
      this.prisma.ticket.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where,
      }),
      this.prisma.ticket.count({ where }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return { meta: { total, page, lastPage }, data };
  }

  findOne(id: string) {
    return `This action returns a #${id} ticket`;
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: string) {
    return `This action removes a #${id} ticket`;
  }

  restore(id: string) {
    throw new Error('Method not implemented.');
  }
}

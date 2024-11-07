import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ExceptionHandler, hasRoles } from 'src/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser, Role } from 'src/user';
import { CreateTicketLog } from '../interfaces/ticket.interface';
import { CreateTicketCommentDto } from './dto';
import { TicketLogType } from 'src/catalog/interfaces';
import { PaginationDto } from 'src/common';

@Injectable()
export class TicketCommentService {
  private readonly logger = new Logger(TicketCommentService.name);
  private readonly exHandler = new ExceptionHandler(this.logger, TicketCommentService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketCommentDto: CreateTicketCommentDto, user: CurrentUser) {
    this.logger.log(`Creating comment: ${JSON.stringify(createTicketCommentDto)}, user: ${user.id} - ${user.username}`);
    try {
      const { ticketId, comment } = createTicketCommentDto;

      const [newComment] = await this.prisma.$transaction([
        this.prisma.ticketComment.create({
          data: { ticketId, comment, createdById: user.id },
          select: { id: true, comment: true },
        }),
        this.createLog({
          ticketId,
          createdById: user.id,
          logTypeId: TicketLogType.Comment,
          message: `User: ${user.username} commented: ${comment}`,
        }),
      ]);

      return newComment;
    } catch (error) {
      this.exHandler.process(error);
    }
  }

  async findAll(ticketId: string, pagination: PaginationDto) {
    this.logger.log(`Fetching comments for ticket: ${ticketId}`);
    const { limit, page } = pagination;

    const [comments, total] = await this.prisma.$transaction([
      this.prisma.ticketComment.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: { ticketId },
        select: { id: true, comment: true, createdAt: true, createdBy: { select: { username: true } } },
      }),
      this.prisma.ticketComment.count({ where: { ticketId } }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return { meta: { total, page, lastPage }, data: comments };
  }

  findOne(id: string, user: CurrentUser) {
    this.logger.log(`Fetching comment: ${id}, user: ${user.id} - ${user.username}`);
    try {
      const isAdmin = hasRoles(user.roles, [Role.Admin]);
      const where = isAdmin ? { id } : { id, createdById: user.id, deletedAt: null };
      const comment = this.prisma.ticketComment.findFirst({ where });

      if (!comment)
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `[ERROR] comment with id ${id} not found`,
        });

      return comment;
    } catch (error) {
      this.exHandler.process(error);
    }
  }

  async remove(id: string, user: CurrentUser) {
    this.logger.log(`Deleting comment: ${id}, user: ${user.id} - ${user.username}`);
    try {
      await this.findOne(id, user);

      return await this.prisma.ticketComment.update({
        where: { id },
        data: { deletedAt: new Date(), deletedById: user.id },
      });
    } catch (error) {
      this.exHandler.process(error);
    }
  }

  async restore(id: string, user: CurrentUser) {
    this.logger.log(`Restoring comment: ${id}, user: ${user.id} - ${user.username}`);
    try {
      await this.findOne(id, user);

      return await this.prisma.ticketComment.update({
        where: { id },
        data: { deletedAt: null, deletedById: null },
      });
    } catch (error) {
      this.exHandler.process(error);
    }
  }

  private createLog(data: CreateTicketLog) {
    return this.prisma.ticketLog.create({ data });
  }
}

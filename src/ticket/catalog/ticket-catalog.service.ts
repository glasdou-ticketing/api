import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketCatalogService {
  private readonly logger = new Logger(TicketCatalogService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    this.logger.log('Fetching ticket categories');
    return this.prisma.ticketCategory.findMany();
  }

  async getStatuses() {
    this.logger.log('Fetching ticket statuses');
    return this.prisma.ticketStatus.findMany();
  }

  async getPriorities() {
    this.logger.log('Fetching ticket priorities');
    return this.prisma.ticketPriority.findMany();
  }
}

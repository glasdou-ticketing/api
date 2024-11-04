import { Module } from '@nestjs/common';

import { AuthModule, AuthService } from 'src/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController],
  providers: [TicketService, AuthService, PrismaService],
  imports: [AuthModule],
})
export class TicketModule {}

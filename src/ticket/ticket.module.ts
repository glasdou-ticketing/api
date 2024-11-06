import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';

import { AuthModule, AuthService } from 'src/auth';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController],
  providers: [TicketService, AuthService],
  imports: [PrismaModule, AuthModule],
})
export class TicketModule {}

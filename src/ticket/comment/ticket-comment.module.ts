import { Module } from '@nestjs/common';
import { TicketCommentService } from './ticket-comment.service';
import { TicketCommentController } from './ticket-comment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth';

@Module({
  controllers: [TicketCommentController],
  providers: [TicketCommentService],
  imports: [PrismaModule, AuthModule],
})
export class TicketCommentModule {}

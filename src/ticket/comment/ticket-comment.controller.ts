import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TicketCommentService } from './ticket-comment.service';
import { CreateTicketCommentDto } from './dto';
import { GetUser } from 'src/auth';
import { CurrentUser } from 'src/user';
import { PaginationDto, ParseCuidPipe } from 'src/common';

@Controller('ticket/comment')
export class TicketCommentController {
  constructor(private readonly ticketCommentService: TicketCommentService) {}

  @Post()
  create(@Body() createTicketCommentDto: CreateTicketCommentDto, @GetUser() user: CurrentUser) {
    return this.ticketCommentService.create(createTicketCommentDto, user);
  }

  @Get(':ticketId')
  findAll(@Param('ticketId', ParseCuidPipe) ticketId: string, @Query() pagination: PaginationDto) {
    return this.ticketCommentService.findAll(ticketId, pagination);
  }

  @Delete(':id')
  remove(@Param('id', ParseCuidPipe) id: string, @GetUser() user: CurrentUser) {
    return this.ticketCommentService.remove(id, user);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseCuidPipe) id: string, @GetUser() user: CurrentUser) {
    return this.ticketCommentService.restore(id, user);
  }
}

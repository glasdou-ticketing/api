import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PaginationDto, ParseCuidPipe } from 'src/common';
import { Auth, GetUser } from 'src/auth';
import { CurrentUser } from 'src/user';

@Controller('ticket')
@Auth()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @GetUser() user: CurrentUser) {
    return this.ticketService.create(createTicketDto, user);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto, @GetUser() user: CurrentUser) {
    return this.ticketService.findAll(pagination, user);
  }

  @Get(':id')
  findOne(@Param('id', ParseCuidPipe) id: string, @GetUser() user: CurrentUser) {
    return this.ticketService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseCuidPipe) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @GetUser() user: CurrentUser,
  ) {
    return this.ticketService.update(id, updateTicketDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseCuidPipe) id: string, @GetUser() user: CurrentUser) {
    return this.ticketService.remove(id, user);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseCuidPipe) id: string, @GetUser() user: CurrentUser) {
    return this.ticketService.restore(id, user);
  }
}

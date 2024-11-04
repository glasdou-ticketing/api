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
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto, @GetUser() user: CurrentUser) {
    return this.ticketService.findAll(pagination, user);
  }

  @Get(':id')
  findOne(@Param('id', ParseCuidPipe) id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseCuidPipe) id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseCuidPipe) id: string) {
    return this.ticketService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseCuidPipe) id: string) {
    return this.ticketService.restore(id);
  }
}

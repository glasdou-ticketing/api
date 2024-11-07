import { IsNotEmpty } from 'class-validator';
import { IsCuid } from 'src/common';

export class CreateTicketCommentDto {
  @IsNotEmpty()
  comment: string;

  @IsCuid()
  ticketId: string;
}

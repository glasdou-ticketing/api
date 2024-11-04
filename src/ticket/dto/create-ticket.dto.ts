import { IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';
import { Department, TicketCategory, TicketPriority, TicketStatus } from 'src/catalog/interfaces';

export class CreateTicketDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  description: string;

  @IsPositive()
  @IsEnum(TicketCategory)
  categoryId: number;

  @IsPositive()
  @IsEnum(TicketPriority)
  priorityId: number;

  @IsPositive()
  @IsEnum(TicketStatus)
  statusId: number;

  @IsPositive()
  @IsEnum(Department)
  @IsOptional()
  departmentId?: number;
}

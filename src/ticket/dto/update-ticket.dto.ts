import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTicketDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}

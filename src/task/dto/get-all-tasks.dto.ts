import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetAllTasksDto {
  @ApiPropertyOptional({ example: 1 })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ example: '2023-06-10' })
  @IsString()
  @IsOptional()
  date?: Date;
}

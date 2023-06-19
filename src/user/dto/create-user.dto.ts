import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'adilet@code-care.pro' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'somePassword' })
  @IsString()
  password: string;
}

import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsOptional()
  @IsString()
  avatar: string;
}

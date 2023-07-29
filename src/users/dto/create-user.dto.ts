import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

/**
 * برای ساخت یک کاربر جدید Dto
 * @class CreateUserDto
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} role
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  role: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * برای آپدیت کردن یک کاربر Dto
 * @class UpdateUserDto
 * @extends {PartialType(CreateUserDto)}
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} role
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}

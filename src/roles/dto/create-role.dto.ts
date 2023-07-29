import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * برای ساخت یک نقش جدید Dto
 * @class CreateRoleDto
 * @property {string} role
 * @public
 * @returns {string}
 */
export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  role: string;
}

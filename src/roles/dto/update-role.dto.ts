import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

/**
 * برای بروزرسانی کاربر Dto
 * @class UpdateRoleDto
 * @extends {PartialType(CreateRoleDto)}
 */
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}

import { SetMetadata } from '@nestjs/common';
import { Role } from '../interface/role.interface';

/**
 * تزریق متادیتا برای چک کردن نقش کاربر
 * @param {Role[]} hasRoles
 * @returns {void}
 */
export const HasRoles = (...hasRoles: Role[]) => SetMetadata('roles', hasRoles);

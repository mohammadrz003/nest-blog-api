import { SetMetadata } from '@nestjs/common';
import { Role } from '../interface/role.interface';

export const HasRoles = (...hasRoles: Role[]) => SetMetadata('roles', hasRoles);

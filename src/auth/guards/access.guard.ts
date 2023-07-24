import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '../interface/role.interface';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
    private prismaService: PrismaService,
  ) {}

  identifyAction(action: string, type: 'own' | 'any'): string {
    switch (action) {
      case 'create':
        return type === 'any' ? 'createAny' : 'createOwn';
      case 'read':
        return type === 'any' ? 'readAny' : 'readOwn';
      case 'update':
        return type === 'any' ? 'updateAny' : 'updateOwn';
      case 'delete':
        return type === 'any' ? 'deleteAny' : 'deleteOwn';
      default:
        return action;
    }
  }

  async getResourceOwner(
    request,
    resource: string,
    action: Role['action'],
  ): Promise<boolean> {
    if (action !== 'read') {
      const user = request.user.id;
      const resourceOwner = await this.prismaService[resource].findFirst({
        where: { userId: user },
      });
      return Boolean(resourceOwner);
    }
    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionRequirements = this.reflector.get(
      'roles',
      context.getHandler(),
    );

    if (!permissionRequirements) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const role = request.user.role;

    const action = permissionRequirements[0].action;
    const resource = permissionRequirements[0].resource;
    const possession = permissionRequirements[0].possession;
    const tableName = permissionRequirements[0].tableName;

    const hasUserPost = await this.getResourceOwner(
      request,
      tableName || resource,
      action,
    );

    const roleAccess = this.roleBuilder.permission({
      role,
      action,
      resource,
      possession,
    });

    let shouldPass = false;

    if (
      hasUserPost &&
      this.roleBuilder.can(role)[this.identifyAction(action, 'own')](resource)
        .granted &&
      roleAccess.granted
    ) {
      request.user.possession = 'own';
      shouldPass = true;
    } else if (
      this.roleBuilder.can(role)[this.identifyAction(action, 'any')](resource)
        .granted &&
      roleAccess.granted
    ) {
      request.user.possession = 'any';
      shouldPass = true;
    } else {
      shouldPass = false;
    }

    return shouldPass;
  }
}

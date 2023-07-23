import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
    private prismaService: PrismaService,
  ) {}

  identifyAction(action: string): string {
    switch (action) {
      case 'create':
        return 'createAny';
      case 'read':
        return 'readAny';
      case 'update':
        return 'updateAny';
      case 'delete':
        return 'deleteAny';
      default:
        return action;
    }
  }

  async getResourceOwner(request, resource: string): Promise<boolean> {
    const user = request.user.id;
    const resourceOwner = await this.prismaService[resource].findFirst({
      where: { userId: user },
    });
    return Boolean(resourceOwner);
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

    const hasUserPost = await this.getResourceOwner(
      request,
      permissionRequirements[0].resource,
    );

    const action = permissionRequirements[0].action;
    const resource = permissionRequirements[0].resource;
    const possession = permissionRequirements[0].possession;

    const roleAccess = this.roleBuilder.permission({
      role,
      action,
      resource,
      possession,
    });

    let shouldPass = false;

    if (
      hasUserPost &&
      this.roleBuilder.can(role)[this.identifyAction(action)](resource)
        .granted &&
      roleAccess.granted
    ) {
      request.user.possession = 'own';
      shouldPass = true;
    } else if (
      this.roleBuilder.can(role)[this.identifyAction(action)](resource)
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

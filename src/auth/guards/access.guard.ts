import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '../interface/role.interface';
import { Util } from 'src/util';

/**
 * گارد برای چک کردن دسترسی کاربر
 * @class AccessGuard
 * @implements {CanActivate}
 * @module AccessGuard
 * @property {Reflector} reflector
 * @property {RolesBuilder} roleBuilder
 * @property {PrismaService} prismaService
 */
@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
    private prismaService: PrismaService,
  ) {}

  /**
   * چک کردن اینکه آیا کاربر مالک منبع است یا خیر
   * @param {Request} request
   * @param {string} resource
   * @param {Role['action']} action
   * @memberof AccessGuard
   * @method getResourceOwner
   * @public
   * @returns {Promise<boolean>}
   */
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

  /**
   * چک کردن دسترسی کاربر
   * @param {ExecutionContext} context
   * @memberof AccessGuard
   * @method canActivate
   * @public
   * @returns {Promise<boolean>}
   * @todo نوشتن کامنت برای توضیح کد‌های داخل متد
   */
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
      this.roleBuilder.can(role)[Util.identifyAction(action, 'own')](resource)
        .granted &&
      roleAccess.granted
    ) {
      request.user.possession = 'own';
      shouldPass = true;
    } else if (
      this.roleBuilder.can(role)[Util.identifyAction(action, 'any')](resource)
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

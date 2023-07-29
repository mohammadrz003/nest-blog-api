import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { DecodedJwtI } from '../interface/decoded-jwt.interface';

/**
 * گارد برای چک کردن دسترسی کاربر
 * @class AuthGuard
 * @implements {CanActivate}
 * @module AuthGuard
 * @property {Reflector} reflector
 * @property {UsersService} userSerive
 * @todo نوشتن کامنت برای توضیح کد‌های داخل متد
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UsersService))
    private userSerive: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: DecodedJwtI = request.user;

    try {
      const userFromDB = await this.userSerive.findOne(user.id);
      const role = userFromDB.role.name;
      userFromDB.role = role;
      request.user = userFromDB;
      return true;
    } catch (error) {
      return false;
    }
  }
}

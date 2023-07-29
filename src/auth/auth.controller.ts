import {
  Controller,
  Request,
  Body,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Me } from './guards/me/me.guard';

/**
 * برای گرنت ها CRUD کنترلر تعریف عملیات
 * ‍@class AuthController
 * @property {AuthService} authService
 * @module AuthController
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * لاگین کاربر
   * @param {Request} req
   * @memberof AuthController
   * @method login
   * @public
   * @returns {Promise<{ access_token: string }>}
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authService.sign(req.user);
  }

  /**
   * پروفایل کاربر
   * @param {Request} req
   * @memberof AuthController
   * @method profile
   * @public
   * @returns {Promise<{ access_token: string }>}
   */
  @Get('profile')
  @UseGuards(JwtGuard)
  profile(@Me() me) {
    return me;
  }

  /**
   * ثبت نام کاربر
   * @param {CreateUserDto} createUserDto
   * @memberof AuthController
   * @method register
   * @public
   * @returns {Promise<{ access_token: string }>}
   * @todo ایجاد یک رول برای کاربر جدید
   */
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser({
      ...createUserDto,
      role: {
        connectOrCreate: { where: { role: 'user' }, create: { role: 'user' } },
      },
    });
  }
}

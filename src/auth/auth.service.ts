import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

/**
 * سرویس احراز هویت
 * @class AuthService
 * @property {UsersService} usersService
 * @property {JwtService} jwtService
 * @module AuthService
 * @todo ایجاد یک رول برای کاربر جدید
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * اعتبار سنجی کاربر
   * @param {string} email
   * @param {string} password
   * @memberof AuthService
   * @method validateUser
   * @public
   * @returns {Promise<User | false>}
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return false;
    }
    return user;
  }

  /**
   * ایجاد توکن
   * @param {User} user
   * @memberof AuthService
   * @method sign
   * @public
   * @returns {Promise<{ access_token: string }>}
   */
  sign(user: User) {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    return {
      access_token: accessToken,
    };
  }

  /**
   * ثبت نام کاربر
   * @param {Prisma.UserCreateInput} createUserDto
   * @memberof AuthService
   * @method registerUser
   * @public
   * @returns {Promise<{ access_token: string }>}
   */
  async registerUser(createUserDto: Prisma.UserCreateInput) {
    const newUser = await this.usersService.create(createUserDto);
    return this.sign(newUser);
  }
}

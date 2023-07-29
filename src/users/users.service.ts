import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { Util } from 'src/util';

/**
 * سرویس کاربران
 * @module UsersService
 * @property {PrismaService} prismaService
 */
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  /**
   * ایجاد کاربر جدید
   * @param {Prisma.UserCreateInput} createUserDto
   * @memberof UsersService
   * @method create
   * @public
   * @returns {Promise<User>}
   */
  async create(createUserDto: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  /**
   * دریافت تمام کاربران
   * @param {Prisma.UserInclude} query
   * @memberof UsersService
   * @method findAll
   * @public
   * @returns {Promise<User[]>}
   */
  async findAll(query?: Prisma.UserInclude) {
    const users = await this.prismaService.user.findMany({
      include: query,
    });
    return Util.exclude(users, 'password');
  }

  /**
   * دریافت کاربر با ایمیل
   * @param {string} email
   * @memberof UsersService
   * @method findOneByEmail
   * @public
   * @returns {Promise<User>}
   */
  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  /**
   * دریافت یک کاربر با استفاده از آیدی
   * @param {string} id
   * @memberof UsersService
   * @method findOne
   * @public
   * @returns {Promise<User>}
   */
  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { role: { select: { role: true } } },
    });
    return Util.exclude(user, 'password');
  }

  /**
   * بروزرسانی کاربر
   * @param {string} id
   * @param {Prisma.UserUpdateInput} updateUserDto
   * @memberof UsersService
   * @method update
   * @public
   * @returns {Promise<User>}
   */
  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    const updatedUser = await this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });
    return Util.exclude(updatedUser, 'password');
  }

  /**
   * حذف کاربر
   * @param {string} id
   * @memberof UsersService
   * @method remove
   * @public
   * @returns {Promise<User>}
   */
  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}

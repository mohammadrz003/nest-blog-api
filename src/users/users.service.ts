import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Util } from 'src/util';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll(query?: Prisma.UserInclude) {
    const users = await this.prismaService.user.findMany({
      include: query,
    });
    return Util.exclude(users, 'password');
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { role: { select: { name: true } } },
    });
    return Util.exclude(user, 'password');
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    const updatedUser = await this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });
    return Util.exclude(updatedUser, 'password');
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}

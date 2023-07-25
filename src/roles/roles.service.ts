import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  create(createRoleDto: Prisma.RoleCreateInput) {
    return this.prismaService.role.create({ data: createRoleDto });
  }

  findAll(query?: Prisma.RoleInclude) {
    return this.prismaService.role.findMany({ include: query });
  }

  findRoleByTitle(role: string) {
    return this.prismaService.role.findUnique({
      where: {
        role,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

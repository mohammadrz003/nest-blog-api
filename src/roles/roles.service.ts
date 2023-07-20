import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
    return this.prismaService.role.create({ data: createRoleDto });
  }

  findAll() {
    return this.prismaService.role.findMany();
  }

  findRoleByTitle(name: string) {
    return this.prismaService.role.findUnique({
      where: {
        name,
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

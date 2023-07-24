import { Injectable } from '@nestjs/common';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GrantsService {
  constructor(private prismaService: PrismaService) {}

  create(createGrantDto: Prisma.GrantCreateInput) {
    return this.prismaService.grant.create({ data: createGrantDto });
  }

  findAll() {
    return `This action returns all grants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grant`;
  }

  findByResource(roleId: string, resource: string) {
    return this.prismaService.grant.findMany({
      where: {
        roleId,
        resource,
      },
    });
  }

  update(id: number, updateGrantDto: UpdateGrantDto) {
    return `This action updates a #${id} grant`;
  }

  remove(id: number) {
    return `This action removes a #${id} grant`;
  }
}

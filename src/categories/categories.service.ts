import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(readonly prismaService: PrismaService) {}

  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({ data: createCategoryDto });
  }

  findAll(query?: Prisma.CategoryInclude) {
    return this.prismaService.category.findMany({ include: query });
  }

  findOne(id: string) {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      data: updateCategoryDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.category.delete({ where: { id } });
  }
}

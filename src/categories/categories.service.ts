import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Category as CategoryModel } from '@prisma/client';

/**
 * سرویس دسته بندی ها
 * @class CategoriesService
 * @property {PrismaService} prismaService
 * @module CategoriesService
 * @public
 */
@Injectable()
export class CategoriesService {
  constructor(readonly prismaService: PrismaService) {}

  /**
   * ایجاد دسته بندی جدید
   * @param {Prisma.CategoryCreateInput} createCategoryDto
   * @memberof CategoriesService
   * @method create
   * @public
   * @returns {Promise<CategoryModel>}
   */
  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({ data: createCategoryDto });
  }

  /**
   * دریافت تمامی دسته بندی ها
   * @param {Prisma.CategoryInclude} query
   * @memberof CategoriesService
   * @method findAll
   * @public
   * @returns {Promise<CategoryModel[]>}
   */
  findAll(query?: Prisma.CategoryInclude) {
    return this.prismaService.category.findMany({ include: query });
  }

  /**
   * دریافت دسته بندی با شناسه
   * @param {string} id
   * @memberof CategoriesService
   * @method findOne
   * @public
   * @returns {Promise<CategoryModel>}
   */
  findOne(id: string) {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  /**
   * بروزرسانی دسته بندی با شناسه
   * @param {string} id
   * @param {UpdateCategoryDto} updateCategoryDto
   * @memberof CategoriesService
   * @method update
   * @public
   * @returns {Promise<CategoryModel>}
   */
  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      data: updateCategoryDto,
      where: { id },
    });
  }

  /**
   * حذف دسته بندی با شناسه
   * @param {string} id
   * @memberof CategoriesService
   * @method remove
   * @public
   * @returns {Promise<void>}
   */
  remove(id: string) {
    return this.prismaService.category.delete({ where: { id } });
  }
}

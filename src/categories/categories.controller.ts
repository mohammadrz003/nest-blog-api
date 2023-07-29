import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/query.dto';
import { Util } from 'src/util';
import { Me } from 'src/auth/guards/me/me.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Category as CategoryModel } from '@prisma/client';

/**
 * برای دسته بندی ها CRUD کنترلر تعریف عملیات
 * @class CategoriesController
 * @property {CategoriesService} categoriesService
 * @module CategoriesController
 */
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * ایجاد دسته بندی جدید
   * @param {CreateCategoryDto} createCategoryDto
   * @memberof CategoriesController
   * @method create
   * @public
   * @returns {Promise<CategoryModel>}
   */
  @Post()
  @UseGuards(JwtGuard)
  create(@Me() { id }, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create({
      ...createCategoryDto,
      author: { connect: { id } },
    });
  }

  /**
   * دریافت تمامی دسته بندی ها
   * @param {CategoryQueryDto} query
   * @memberof CategoriesController
   * @method findAll
   * @public
   * @returns {Promise<CategoryModel[]>}
   */
  @Get()
  findAll(@Query() query: CategoryQueryDto) {
    return this.categoriesService.findAll(Util.isEmpty(query) ? null : query);
  }

  /**
   * دریافت دسته بندی با شناسه
   * @param {string} id
   * @memberof CategoriesController
   * @method findOne
   * @public
   * @returns {Promise<CategoryModel>}
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  /**
   * بروزرسانی دسته بندی با شناسه
   * @param {string} id
   * @param {UpdateCategoryDto} updateCategoryDto
   * @memberof CategoriesController
   * @method update
   * @public
   * @returns {Promise<CategoryModel>}
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  /**
   * حذف دسته بندی با شناسه
   * @param {string} id
   * @memberof CategoriesController
   * @method remove
   * @public
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(id);
  }
}

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

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Me() { id }, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create({
      ...createCategoryDto,
      author: { connect: { id } },
    });
  }

  @Get()
  findAll(@Query() query: CategoryQueryDto) {
    return this.categoriesService.findAll(Util.isEmpty(query) ? null : query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(id);
  }
}

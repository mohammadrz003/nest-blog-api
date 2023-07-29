import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

/**
 * برای به روز رسانی دسته بندی DTO
 * @class UpdateCategoryDto
 * @extends {PartialType(CreateCategoryDto)}
 * @property {string} name
 */
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

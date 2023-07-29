import { MinLength, IsNotEmpty, IsString } from 'class-validator';

/**
 * برای ایجاد دسته بندی جدید DTO
 * @class CreateCategoryDto
 * @property {string} name
 */
export class CreateCategoryDto {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  name: string;
}

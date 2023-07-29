import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * برای ساخت یک پست جدید Dto
 * @class CreatePostDto
 * @property {string} title
 * @property {string} body
 * @property {string[]} categories
 */
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  body: string;

  categories: string[];
}

import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

/**
 * برای بروزرسانی کاربر Dto
 * @class UpdatePostDto
 * @extends {PartialType(CreatePostDto)}
 * @public
 * @property {string} title
 * @property {string} body
 * @property {string[]} categories
 */
export class UpdatePostDto extends PartialType(CreatePostDto) {}

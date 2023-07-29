import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Post as PostModel } from '@prisma/client';

/**
 * برای پست ها CRUD سرویس تعریف عملیات
 * @class PostsService
 * @property {PrismaService} prismaService
 * @module PostsService
 */
@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  /**
   * ایجاد پست جدید
   * @param {Prisma.PostCreateInput} createPostDto
   * @memberof PostsService
   * @method create
   * @public
   * @returns {Promise<PostModel>}
   */
  create(createPostDto: Prisma.PostCreateInput) {
    return this.prismaService.post.create({ data: createPostDto });
  }

  /**
   * دریافت تمامی پست ها
   * @param {Prisma.PostInclude} query
   * @memberof PostsService
   * @method findAll
   * @public
   * @returns {Promise<PostModel[]>}
   */
  findAll(query?: Prisma.PostInclude) {
    return this.prismaService.post.findMany({ include: query });
  }

  /**
   * دریافت پست با شناسه
   * @param {string} id
   * @memberof PostsService
   * @method findOne
   * @public
   * @returns {Promise<PostModel>}
   */
  findOne(id: string) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  /**
   * بروزرسانی پست با شناسه
   * @param {string} id
   * @param {Prisma.PostUpdateInput} updatePostDto
   * @memberof PostsService
   * @method update
   * @public
   * @returns {Promise<PostModel>}
   */
  update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    return this.prismaService.post.update({
      data: updatePostDto,
      where: { id },
    });
  }

  /**
   * حذف پست با شناسه
   * @param {string} id
   * @memberof PostsService
   * @method remove
   * @public
   * @returns {Promise<void>}
   */
  remove(id: string) {
    return this.prismaService.post.delete({ where: { id } });
  }
}

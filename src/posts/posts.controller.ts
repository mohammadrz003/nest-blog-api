import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Me } from 'src/auth/guards/me/me.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { PostQueryDto } from './dto/query.dto';
import { Util } from 'src/util';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { HasRoles } from 'src/auth/decorator/roles.decorator';
import { Post as PostModel } from '@prisma/client';

/**
 * برای پست ها CRUD کنترلر تعریف عملیات
 * @class PostsController
 * @property {PostsService} postsService
 * @module PostsController
 */
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * ایجاد پست جدید
   * @param {CreatePostDto} createPostDto
   * @memberof PostsController
   * @method create
   * @public
   * @returns {Promise<PostModel>}
   */
  @Post()
  @UseGuards(JwtGuard)
  create(@Me() { id }, @Body() createPostDto: CreatePostDto) {
    const categories = createPostDto.categories?.map((category) => ({
      id: category,
    }));
    return this.postsService.create({
      ...createPostDto,
      author: { connect: { id: id } },
      categories: { connect: categories },
    });
  }

  /**
   * دریافت تمامی پست ها
   * @param {PostQueryDto} query
   * @memberof PostsController
   * @method findAll
   * @public
   * @returns {Promise<PostModel[]>}
   */
  @UseGuards(JwtGuard, AuthGuard, AccessGuard)
  @HasRoles({
    resource: 'post',
    action: 'read',
    possession: 'own',
    tableName: 'post',
  })
  @Get()
  findAll(@Me() user, @Query() query: PostQueryDto) {
    return this.postsService.findAll(Util.isEmpty(query) ? null : query);
  }

  /**
   * دریافت یک پست با شناسه
   * @param {string} id
   * @memberof PostsController
   * @method findOne
   * @public
   * @returns {Promise<PostModel>}
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  /**
   * بروزرسانی یک پست با شناسه
   * @param {string} id
   * @param {UpdatePostDto} updatePostDto
   * @memberof PostsController
   * @method update
   * @public
   * @returns {Promise<PostModel>}
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const categories = updatePostDto.categories?.map((category) => ({
      id: category,
    }));
    return this.postsService.update(id, {
      ...updatePostDto,
      categories: { set: categories },
    });
  }

  /**
   * حذف یک پست با شناسه
   * @param {string} id
   * @memberof PostsController
   * @method remove
   * @public
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}

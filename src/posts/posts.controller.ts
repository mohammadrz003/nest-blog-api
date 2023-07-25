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

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

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

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}

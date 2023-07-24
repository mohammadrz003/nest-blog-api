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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/query.dto';
import { Util } from '../util';
import { HashPassPipe } from './pipe/hash-pass/hash-pass.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(HashPassPipe) createUserDto: CreateUserDto) {
    const user = await this.usersService.create({
      ...createUserDto,
      role: {
        connectOrCreate: { where: { role: 'user' }, create: { role: 'user' } },
      },
    });
    return Util.exclude(user, 'password');
  }

  @Get()
  findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(Util.isEmpty(query) ? null : query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, {
      ...updateUserDto,
      role: { connect: { id: updateUserDto.role } },
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}

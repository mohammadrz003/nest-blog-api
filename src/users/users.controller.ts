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

/**
 * مربوط به کاربران CRUD کنترلر برای تعریف اکشن های مختلف برای عملیات
 * @class UsersController
 * @property {UsersService} usersService
 * @module UsersController
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * ایجاد کاربر جدید
   * @param {CreateUserDto} createUserDto
   * @memberof UsersController
   * @method create
   * @public
   * @returns {Promise<CreateUserDto>}
   */
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

  /**
   * دریافت تمام کاربران
   * @param {UserQueryDto} query
   * @memberof UsersController
   * @method findAll
   * @public
   * @returns {Promise<CreateUserDto[]>}
   */
  @Get()
  findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(Util.isEmpty(query) ? null : query);
  }

  /**
   * دریافت یک کاربر با استفاده از آیدی
   * @param {string} id
   * @memberof UsersController
   * @method findOne
   * @public
   * @returns {Promise<CreateUserDto>}
   * @throws {HttpException}
   */
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

  /**
   * بروزرسانی یک کاربر با استفاده از آیدی
   * @param {string} id
   * @param {UpdateUserDto} updateUserDto
   * @memberof UsersController
   * @method update
   * @public
   * @returns {Promise<CreateUserDto>}
   * @throws {HttpException}
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, {
      ...updateUserDto,
      role: { connect: { id: updateUserDto.role } },
    });
  }

  /**
   * حذف یک کاربر با استفاده از آیدی
   * @param {string} id
   * @memberof UsersController
   * @method remove
   * @public
   * @returns {Promise<void>}
   * @throws {HttpException}
   */
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}

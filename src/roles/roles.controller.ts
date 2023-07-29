import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Me } from 'src/auth/guards/me/me.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

/**
 * برای نقش ها CRUD کنترلر تعریف عملیات
 * @class RolesController
 * @property {RolesService} rolesService
 * @module RolesController
 */
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * ایجاد نقش جدید
   * @param {CreateRoleDto} createRoleDto
   * @memberof RolesController
   * @method create
   * @public
   * @returns {Promise<CreateRoleDto>}
   */
  @Post()
  @UseGuards(JwtGuard)
  create(@Me() { id }, @Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create({
      ...createRoleDto,
      author: { connect: { id } },
    });
  }

  /**
   * دریافت تمام نقش ها
   * @memberof RolesController
   * @method findAll
   * @public
   * @returns {Promise<CreateRoleDto[]>}
   */
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  /**
   * دریافت یک نقش با استفاده از آیدی
   * @param {string} id
   * @memberof RolesController
   * @method findOne
   * @public
   * @returns {Promise<CreateRoleDto>}
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  /**
   * بروزرسانی نقش با استفاده از آیدی
   * @param {string} id
   * @param {UpdateRoleDto} updateRoleDto
   * @memberof RolesController
   * @method update
   * @public
   * @returns {Promise<CreateRoleDto>}
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  /**
   * حذف نقش با استفاده از آیدی
   * @param {string} id
   * @memberof RolesController
   * @method remove
   * @public
   * @returns {Promise<CreateRoleDto>}
   * @todo باید اجازه حذف نقش های پیش فرض را نداشته باشیم
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}

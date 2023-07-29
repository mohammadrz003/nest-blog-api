import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  /**
   * ایجاد نقش جدید
   * @param {Prisma.RoleCreateInput} createRoleDto
   * @memberof RolesService
   * @method create
   * @public
   * @returns {Promise<Role>}
   */
  create(createRoleDto: Prisma.RoleCreateInput) {
    return this.prismaService.role.create({ data: createRoleDto });
  }

  /**
   * دریافت تمام نقش ها
   * @param {Prisma.RoleInclude} query
   * @memberof RolesService
   * @method findAll
   * @public
   * @returns {Promise<Role[]>}
   */
  findAll(query?: Prisma.RoleInclude) {
    return this.prismaService.role.findMany({ include: query });
  }

  /**
   * دریافت نقش با عنوان
   * @param {string} role
   * @memberof RolesService
   * @method findOneByTitle
   * @public
   * @returns {Promise<Role>}
   */
  findRoleByTitle(role: string) {
    return this.prismaService.role.findUnique({
      where: {
        role,
      },
    });
  }

  /**
   * دریافت یک نقش با استفاده از آیدی
   * @param {string} id
   * @memberof RolesService
   * @method findOne
   * @public
   * @returns {Promise<Role>}
   */
  async findOne(id: string) {
    return this.prismaService.role.findUnique({
      where: { id },
    });
  }

  /**
   * به روزرسانی نقش
   * @param {string} id
   * @param {Prisma.RoleUpdateInput} updateRoleDto
   * @memberof RolesService
   * @method update
   * @public
   * @returns {Promise<Role>}
   */
  update(id: string, updateRoleDto: Prisma.RoleUpdateInput) {
    return this.prismaService.post.update({
      data: updateRoleDto,
      where: { id },
    });
  }

  /**
   * حذف نقش
   * @param {string} id
   * @memberof RolesService
   * @method remove
   * @public
   * @returns {Promise<Role>}
   */
  remove(id: string) {
    return this.prismaService.role.delete({ where: { id } });
  }
}

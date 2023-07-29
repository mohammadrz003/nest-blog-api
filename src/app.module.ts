import { Module, OnModuleInit } from '@nestjs/common';
import {
  AccessControlModule,
  RolesBuilder,
  InjectRolesBuilder,
} from 'nest-access-control';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { AppService } from './app.service';
import { RolesService } from './roles/roles.service';
import { PrismaService } from './prisma/prisma.service';
import { GrantsModule } from './grants/grants.module';
import * as bcrypt from 'bcrypt';
import { Util } from './util';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SeedGrantData } from './database/seeds/grants/grants.seed';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    CategoriesModule,
    PostsModule,
    AuthModule,
    RolesModule,
    GrantsModule,
    EventEmitterModule.forRoot(),
    AccessControlModule.forRootAsync({
      imports: [RolesModule],
      inject: [RolesService],
      useFactory: async (roleService: RolesService): Promise<RolesBuilder> => {
        const roles = await roleService.findAll({ grants: true });
        const formattedRoles = Util.formatRoles(roles);
        if (formattedRoles.length === 0) {
          return new RolesBuilder();
        }
        return new RolesBuilder(formattedRoles);
      },
    }),
  ],
  providers: [AppService],
})
/**
 * ماژول اصلی برنامه
 * @module AppModule
 * @implements {OnModuleInit}
 * @param {AppService} appService
 * @param {RolesService} roleService
 * @param {PrismaService} prismaService
 * @param {RolesBuilder} rolesBuilder
 * @returns {Promise<void>}
 */
export class AppModule implements OnModuleInit {
  constructor(
    private appService: AppService,
    private roleService: RolesService,
    private prismaService: PrismaService,
    @InjectRolesBuilder() private readonly rolesBuilder: RolesBuilder,
  ) {}

  /**
   * این متد برای ایجاد ادمین و ساخت نقش ها و دسترسی های اولیه برنامه است
   * @returns {Promise<void>}
   * @memberof AppModule
   * @override
   * @implements {OnModuleInit}
   */
  async onModuleInit() {
    const totalUser = await this.appService.getTotalUser();
    // اگر هیچ کاربری در دیتابیس وجود نداشت، شروع به ساخت دیتای اولیه میکنیم
    if (totalUser === 0) {
      await this.prismaService.role.deleteMany();
      // هش کردن پسورد ادمین
      const saltOrRounds = 10;
      const password = process.env.ADMIN_PASSWORD;
      const hash = await bcrypt.hash(password, saltOrRounds);
      // ساخت رول های اولیه
      const adminRole = await this.roleService.create({
        role: 'admin',
      });
      const userRole = await this.roleService.create({
        role: 'user',
      });
      // اختصاص دادن نقش ادمین به کاربر ادمینی که به تازگی ساخته شده است
      const adminUser = await this.prismaService.user.create({
        data: {
          name: process.env.ADMIN_USERNAME,
          email: process.env.ADMIN_EMAIL,
          password: hash,
          role: {
            connect: { id: adminRole.id },
          },
        },
      });
      // مرتبط کردن رول ها با ادمین
      const roles = [adminRole, userRole];
      for (const role of roles) {
        await this.prismaService.role.update({
          where: { id: role.id },
          data: {
            author: {
              connect: { id: adminUser.id },
            },
          },
        });
      }
      // ساخت دسترسی های اولیه
      const initialGrants = SeedGrantData.seedGrants(
        adminRole.id,
        adminUser.id,
      );
      await this.prismaService.grant.createMany({
        data: [...initialGrants],
      });

      // دریافت رول ها از دیتابیس و ست کردن آنها در اکسس کنترل
      const rolesFromDB = await this.roleService.findAll({ grants: true });
      const formattedRoles = Util.formatRoles(rolesFromDB);
      if (formattedRoles.length !== 0) {
        this.rolesBuilder.setGrants(formattedRoles);
      }
    }
  }
}

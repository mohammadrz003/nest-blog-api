import { Module, OnModuleInit } from '@nestjs/common';
import { AccessControlModule } from 'nest-access-control';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { AppService } from './app.service';
import { RolesService } from './roles/roles.service';
import { roles } from './app.roles';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    CategoriesModule,
    PostsModule,
    AuthModule,
    RolesModule,
    AccessControlModule.forRoles(roles),
  ],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private appService: AppService,
    private roleService: RolesService,
    private prismaService: PrismaService,
  ) {}

  async onModuleInit() {
    const totalUser = await this.appService.getTotalUser();
    if (totalUser === 0) {
      await this.prismaService.role.deleteMany();
      const adminRole = await this.roleService.create({ name: 'admin' });
      await this.roleService.create({ name: 'user' });

      // hash the password
      const saltOrRounds = 10;
      const password = process.env.ADMIN_PASSWORD;
      const hash = await bcrypt.hash(password, saltOrRounds);
      await this.prismaService.user.create({
        data: {
          name: process.env.ADMIN_USERNAME,
          email: process.env.ADMIN_EMAIL,
          password: hash,
          roles: {
            connect: [{ id: adminRole.id }],
          },
        },
      });
    }
  }
}

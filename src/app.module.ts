import { Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersService } from './users/users.service';
import { AppService } from './app.service';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    CategoriesModule,
    PostsModule,
    AuthModule,
    RolesModule,
  ],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private appService: AppService,
    private userService: UsersService,
    private roleService: RolesService,
  ) {}

  async onModuleInit() {
    const totalUser = await this.appService.getTotalUser();
    if (totalUser === 0) {
      const adminRole = await this.roleService.create({ name: 'Admin' });
      await this.roleService.create({ name: 'User' });
      await this.userService.create({});
    }
  }
}

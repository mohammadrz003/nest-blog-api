import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

/**
 * ماژول نقش ها
 * @module RolesModule
 */
@Module({
  imports: [AuthModule, forwardRef(() => UsersModule)],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}

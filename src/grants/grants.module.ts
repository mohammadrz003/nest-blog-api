import { Module } from '@nestjs/common';
import { GrantsService } from './grants.service';
import { GrantsController } from './grants.controller';
import { RolesModule } from 'src/roles/roles.module';

/**
 * ماژول گرنت ها
 * @module GrantsModule
 */
@Module({
  imports: [RolesModule],
  controllers: [GrantsController],
  providers: [GrantsService],
})
export class GrantsModule {}

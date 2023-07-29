import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * سرویس پریزما
 * @module PrismaService
 * @extends PrismaClient
 * @implements OnModuleInit
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * بستن ارتباط با پریزما
   * @param {INestApplication} app
   * @memberof PrismaService
   * @public
   * @returns {Promise<void>}
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

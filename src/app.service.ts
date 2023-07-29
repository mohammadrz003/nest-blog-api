import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * سرویس اصلی برنامه
 * @module AppService
 */
@Injectable()
export class AppService {
  /**
   * سازنده سرویس پریزما
   * @param prismaService
   */
  constructor(private prismaService: PrismaService) {}

  /**
   * دریافت تعداد کل کاربران
   * @returns {Promise<number>}
   */
  async getTotalUser() {
    return await this.prismaService.user.count();
  }
}

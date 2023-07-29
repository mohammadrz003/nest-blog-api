import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import 'winston-daily-rotate-file';

/**
 * اولین فانکشنی که با اجرا شدن برنامه ران میشود
 * @module Main
 * @returns {Promise<void>}
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          // با تاریخ مورد نظر جایگزین میشود %DATE
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(
            format.timestamp(),
            format.json({ replacer: null, space: 3 }),
          ),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false, // نمیخواهیم فایل ها زیپ شوند
          maxFiles: '30d', // لاگ فایل ها تا 30 روز نگهداری میشوند
        }),
        new transports.DailyRotateFile({
          // با تاریخ مورد نظر جایگزین میشود %DATE
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(
            format.timestamp(),
            format.json({ replacer: null, space: 3 }),
          ),
          datePattern: 'YYYY-MM-DD', // فرمت تاریخ
          zippedArchive: false,
          maxFiles: '30d',
        }),
        // Nest.js پیشفرض Logger تغییر
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
  });
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

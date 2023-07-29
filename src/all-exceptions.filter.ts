import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * فیلتری برای هندل کردن خطاهای احتمالی
 * @module AllExceptionsFilter
 * @implements {ExceptionFilter}
 * @param {HttpAdapterHost} httpAdapterHost
 * @returns {void}
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // در متد سازنده در دسترس نباشد ، بنابراین ما باید آن را در اینجا حل کنیم. `httpAdapter` در بعضی مواقع ممکن است که
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const responseBody = {
      statusCode: httpStatus,
      message,
    };

    // لاگ گرفتن از خطای ایجاد شده
    this.logger.error(
      `${message} - [${
        ctx.getRequest().method
      }] path:${httpAdapter.getRequestUrl(ctx.getRequest())} - ${httpStatus}`,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

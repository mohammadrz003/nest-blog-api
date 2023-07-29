import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * پارام دکوریتور برای گرفتن اطلاعات کاربر
 * @param {any} data
 * @param {ExecutionContext} context
 * @returns {Promise<any>}
 * @example @Me() user
 */
export const Me = createParamDecorator(
  async (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

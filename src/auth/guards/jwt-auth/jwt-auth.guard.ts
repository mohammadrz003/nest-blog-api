import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * گارد جیسون وب توکن
 * @module JwtGuard
 * @see {@link https://docs.nestjs.com/guards#implementing-a-guard}
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}

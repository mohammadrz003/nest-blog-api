import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * گارد احراز هویت محلی
 * @module LocalAuthGuard
 * @see {@link https://docs.nestjs.com/guards#implementing-a-guard}
 * @see {@link https://docs.nestjs.com/security/authentication#implementing-passport-local}
 * @see {@link https://docs.nestjs.com/security/authentication#implementing-local-authentication}
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwt } from '../constants';
import { DecodedJwtI } from '../interface/decoded-jwt.interface';

/**
 * jwt استراتژی.
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 * @property {function} validate - فانکشن اعتبار سنجی
 * @property {string} secretOrKey - Secret key.
 * @property {function} jwtFromRequest - از درخواست jwt استخراج
 * @method validate - متد اعتبار سنجی
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwt.secrectKey,
    });
  }

  validate(payload: { sub: string; email: string }): DecodedJwtI {
    return { id: payload.sub, email: payload.email };
  }
}

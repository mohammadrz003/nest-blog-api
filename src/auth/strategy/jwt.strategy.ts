import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwt } from '../constants';
import { DecodedJwtI } from '../interface/decoded-jwt.interface';

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

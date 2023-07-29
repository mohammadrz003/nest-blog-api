import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

/**
 * local استراتژی.
 * @class LocalStrategy
 * @extends {PassportStrategy(Strategy)}
 * @property {function} validate - فانکشن اعتبار سنجی
 * @property {string} usernameField - نام فیلد نام کاربری
 * @method validate - متد اعتبار سنجی
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

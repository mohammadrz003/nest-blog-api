import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthGuard } from './guards/auth.guard';
import { AccessGuard } from './guards/access.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwt.secrectKey,
      signOptions: { expiresIn: '10h' },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AccessGuard, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}

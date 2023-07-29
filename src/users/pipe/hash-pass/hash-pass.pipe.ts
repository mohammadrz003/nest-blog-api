import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

/**
 * پایپ برای هش کردن پسورد
 * @implements {PipeTransform}
 * @param {CreateUserDto} value
 * @param {ArgumentMetadata} metadata
 * @returns {Promise<CreateUserDto>}
 */
@Injectable()
export class HashPassPipe implements PipeTransform {
  async transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    try {
      const saltOrRounds = 10;
      const password = value.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return { ...value, password: hash };
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    }
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateGrantDto } from './create-grant.dto';
import { OperateActions } from './create-grant.dto';

/**
 * برای به روز رسانی گرنت DTO
 * @class UpdateGrantDto
 * @extends {PartialType(CreateGrantDto)}
 * @property {string} role
 * @property {string} resource
 * @property {OperateActions} action
 * @property {string[]} attributes
 */
export class UpdateGrantDto extends PartialType(CreateGrantDto) {}

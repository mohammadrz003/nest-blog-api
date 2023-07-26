import { IsArray, IsIn, IsString, MinLength } from 'class-validator';

const actions = [
  'create:own',
  'create:any',
  'read:own',
  'read:any',
  'update:own',
  'update:any',
  'delete:own',
  'delete:any',
] as const;
export type OperateActions = (typeof actions)[number];

export class CreateGrantDto {
  @IsString()
  @MinLength(2)
  role: string;

  @IsString()
  @MinLength(2)
  resource: string;

  @IsIn(actions)
  action: OperateActions;

  @IsArray()
  attributes: string[];
}

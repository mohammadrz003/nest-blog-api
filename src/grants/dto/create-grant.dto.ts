import { IsArray, IsIn, IsString, Matches, Min } from 'class-validator';

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
  @Min(2)
  role: string;

  @IsString()
  @Min(2)
  resource: string;

  @IsIn(actions)
  action: OperateActions;

  // @Matches(/,[^ ]/)
  @IsArray()
  attributes: string[];
}

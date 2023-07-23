import { RolesBuilder } from 'nest-access-control';
export enum AppRoles {
  user = 'user',
  admin = 'admin',
}
export const roles: RolesBuilder = new RolesBuilder();
roles
  .grant(AppRoles.user) // define new or modify existing role. also takes an array.
  .readOwn('post')
  .grant(AppRoles.admin) // switch to another role without breaking the chain
  .readAny('post') // inherit role capabilities. also takes an array
  .createAny('post')
  .updateAny('post', ['title']) // explicitly defined attributes
  .deleteAny('post');

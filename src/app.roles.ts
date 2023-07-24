import { RolesBuilder } from 'nest-access-control';

export enum Roles {
  user = 'user',
  admin = 'admin',
}
export const RESOURCE = {
  post: 'post',
  user: 'user',
  category: 'category',
  role: 'role',
  grant: 'grant',
};
export const ATTRIBUTES = {
  [RESOURCE.user]: [
    '*',
    'id',
    'name',
    'email',
    'password',
    'role',
    'posts',
    'createdAt',
    'updatedAt',
    'assignedRoleId',
  ],
  [RESOURCE.category]: [
    '*',
    'id',
    'name',
    'createdAt',
    'updatedAt',
    'posts',
    'userId',
  ],
  [RESOURCE.post]: [
    '*',
    'id',
    'title',
    'body',
    'userId',
    'createdAt',
    'updatedAt',
  ],
  [RESOURCE.role]: ['*', 'id', 'role', 'userId', 'createdAt', 'updatedAt'],
  [RESOURCE.grant]: [
    '*',
    'id',
    'resource',
    'action',
    'attributes',
    'roleId',
    'createdAt',
    'updatedAt',
  ],
};

export const roles: RolesBuilder = new RolesBuilder();
roles
  .grant(Roles.user)
  .readOwn(RESOURCE.post)
  .grant(Roles.admin)
  .readOwn(RESOURCE.post)
  .createAny(RESOURCE.post)
  .updateAny(RESOURCE.post)
  .deleteAny(RESOURCE.post);

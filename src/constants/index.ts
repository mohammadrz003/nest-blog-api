/**
 * های موجود در برنامه resource تمام
 */
export const RESOURCE = {
  post: 'post',
  user: 'user',
  category: 'category',
  role: 'role',
  grant: 'grant',
};

/**
 * های موجود در برنامه برای رول ها attribute ها و یا permission تمام
 */
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

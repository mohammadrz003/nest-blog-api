import grants from './grants.json';

/**
 * کلاسی برای ایجاد داده های اولیه گرنت ها
 * @class SeedGrantData
 * @method seedGrants ایجاد داده های اولیه گرنت ها
 * @returns {Promise<GrantModel[]>}
 */
export class SeedGrantData {
  static seedGrants(adminRoleId, adminUserId) {
    const grantsArray = grants.map((grant) => {
      return {
        ...grant,
        roleId: adminRoleId,
        userId: adminUserId,
      };
    });
    return grantsArray;
  }
}

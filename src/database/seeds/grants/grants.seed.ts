import grants from './grants.json';

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

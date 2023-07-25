export class Util {
  static exclude(data: any[] | any, ...keys: string[]) {
    if (Array.isArray(data)) {
      for (const obj of data) {
        for (const key of keys) {
          delete obj[key];
        }
      }
    } else {
      for (const key of keys) {
        delete data[key];
      }
    }
    return data;
  }

  static isEmpty(obj: object) {
    return (
      obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    );
  }

  static formatRoles(roles: any[]) {
    const formattedRoles = [];
    for (const role of roles) {
      for (const grant of role.grants) {
        formattedRoles.push({
          role: role.role,
          resource: grant.resource,
          action: grant.action,
          attributes: grant.attributes,
        });
      }
    }
    return formattedRoles;
  }
}

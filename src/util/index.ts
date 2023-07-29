/**
 * @module Util
 * @classdesc کلاس ابزار های کاربردی
 */
export class Util {
  /**
   * این متد برای حذف کردن یک یا چند کلید از یک آبجکت یا آرایه آبجکت ها استفاده میشود
   * @param {any[] | any} data
   * @param {...string[]} keys
   * @returns {any[] | any}
   * @memberof Util
   * @static
   */
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

  /**
   * این متد برای چک کردن اینکه آیا یک آبجکت خالی است یا خیر استفاده میشود
   * @param {object} obj
   * @returns {boolean}
   * @memberof Util
   * @static
   */
  static isEmpty(obj: object) {
    return (
      obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    );
  }

  /**
   * استفاده میشود، استفاده میشود AccessControl این متد برای فرمت کردن نقش ها به صورتی که برای ساخت نقش ها در کتابخانه
   * @param {any[]} roles
   * @returns {any[]}
   * @memberof Util
   * @static
   */
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

  /**
   * استفاده میشود AccessControl این متد برای تبدیل کردن اکشن های اصلی به اکشن های موجود در کتابخانه
   * @param {string} action
   * @param {'own' | 'any'} type
   * @returns {string}
   * @memberof Util
   * @static
   */
  static identifyAction(action: string, type: 'own' | 'any'): string {
    switch (action) {
      case 'create':
        return type === 'any' ? 'createAny' : 'createOwn';
      case 'read':
        return type === 'any' ? 'readAny' : 'readOwn';
      case 'update':
        return type === 'any' ? 'updateAny' : 'updateOwn';
      case 'delete':
        return type === 'any' ? 'deleteAny' : 'deleteOwn';
      default:
        return action;
    }
  }
}

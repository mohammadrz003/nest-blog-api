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
}

export class GrantCreatedEvent {
  /**
   * ایونت ایجاد گرنت جدید
   * @param {string} role
   * @param {string} resource
   * @param {string} action
   * @param {string} attributes
   */
  constructor(
    public readonly role: string,
    public readonly resource: string,
    public readonly action: string,
    public readonly attributes: string,
  ) {}
}

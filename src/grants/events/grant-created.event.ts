export class GrantCreatedEvent {
  constructor(
    public readonly role: string,
    public readonly resource: string,
    public readonly action: string,
    public readonly attributes: string,
  ) {}
}

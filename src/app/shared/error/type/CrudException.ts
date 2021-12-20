export class CrudException extends Error {
  public action: string;
  public type?: string;
  public propertieName?: string;
  public propertieValue?: string;
  public override message: string;

  constructor(
    message: string,
    action: string,
    type?: string,
    propertieName?: string,
    propertieValue?: string,
  ) {
    super(message);
    this.message = message;
    this.action = action;
    this.type = type;
    this.propertieName = propertieName;
    this.propertieValue = propertieValue;
  }
}

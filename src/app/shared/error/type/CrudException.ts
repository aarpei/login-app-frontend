export class CrudException extends Error {
  public status: string;
  public action: string;
  public type?: string;
  public propertieName?: string;
  public propertieValue?: string;
  public override message: string;

  constructor(
    status: string,
    message: string,
    action: string,
    type?: string,
    propertieName?: string,
    propertieValue?: string,
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.action = action;
    this.type = type;
    this.propertieName = propertieName;
    this.propertieValue = propertieValue;
  }
}

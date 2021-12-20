export class CrudException extends Error {
  constructor(message?: string) {
    super(message);
  }
}

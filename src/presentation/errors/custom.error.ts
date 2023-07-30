export default class CustomError extends Error {
  constructor(readonly message: string, private statusCode: number) {
    super(message);
  }

  public getStatus() {
    return this.statusCode;
  }
}
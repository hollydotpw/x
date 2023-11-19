export default class MainException extends Error {
  public readonly isFromX: boolean = true;

  constructor(readonly name: string, readonly message: string) {
    super(message);
    this.name = name;
  }
}

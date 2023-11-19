import MainException from './main-exception';

export default class BloatException extends MainException {
  constructor(message: string) {
    super('BloatException', message);
  }
}

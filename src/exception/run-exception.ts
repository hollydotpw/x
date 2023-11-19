import MainException from './main-exception';

export default class RunException extends MainException {
  constructor(message: string) {
    super('RunException', message);
  }
}

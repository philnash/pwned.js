export class PwnedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PwnedError';
  }
}

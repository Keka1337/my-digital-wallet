export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private tokenExparationDate: Date
  ) {}
  get token() {
    if (!this.tokenExparationDate || this.tokenExparationDate <= new Date()) {
      return null;
    }
    return this._token;
  }
}

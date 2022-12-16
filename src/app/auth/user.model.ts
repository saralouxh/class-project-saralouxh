export class User {

  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // a getter looks like a function but you access it like a property
  public get token() {
    // if this _tokenExpirationDate does not exist or if the current timestamp is greater than _tokenExiprationDate we know its expired
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

}
export class User {
  constructor(
    public id: string,
    // tslint:disable-next-line: variable-name
    public first_name: string,
    // tslint:disable-next-line: variable-name
    public last_name: string,
    public email: string,
    public gender: string,
    // tslint:disable-next-line: variable-name
    public phone_number: string,
    public location: string,
    public address: string,
    public image: string,
    public mode: string,
    public verified: number
  ) {}
}


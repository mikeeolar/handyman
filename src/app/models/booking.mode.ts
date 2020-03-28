export class Booking {
    constructor(
        // tslint:disable-next-line: variable-name
        public user_id: number,
        // tslint:disable-next-line: variable-name
        public specialist_id: number,
        public category: string,
        public service: string,
        // tslint:disable-next-line: variable-name
        public book_date: Date,
        // tslint:disable-next-line: variable-name
        public time_from: Date,
        // tslint:disable-next-line: variable-name
        public time_to: Date,
        public location: string,
        public address: string,
        // tslint:disable-next-line: variable-name
        public add_info: string,
        public status: string
    ) {}
  }

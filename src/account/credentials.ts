export class Credentials {
        public email?: string;
        public password?: string;
        public type?: string
    constructor () {
          this.type = 'client';
    }
}
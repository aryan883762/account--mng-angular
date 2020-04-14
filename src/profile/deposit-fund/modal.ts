
export class Deposit {
	  public accountId?: any;
    public bank?: any;
    public currency?: string;
    public amount?: string;
    public dateTime?: string;
    public remark?: string;
    public doc?: any;
    constructor () {
          this.currency = 'HKD';
          this.remark = '';
          this.doc = null;
          this.bank = 1;
    }
}
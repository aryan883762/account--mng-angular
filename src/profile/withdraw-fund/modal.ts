export class Withdraw {
    public accountId?: any;
    public currency?: string;
    public amount?: string;
    public bankName?: string;
    public accNumber?: number;
    public accountHolder?: string;
    public remark?: string;
    constructor () {
       this.currency = 'HKD'
    }
}
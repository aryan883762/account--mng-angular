import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { SiteApiResponseUtilities } from './SiteApiResponse';
import { ProfileService } from './profile.service';
import { Deposit } from '../../profile/deposit-fund/modal';
import { Withdraw } from '../../profile/withdraw-fund/modal';
@Injectable()
export class StockAccountService {
  
  private respUtils = new SiteApiResponseUtilities();

  constructor(private http: HttpClient, private profileSvc: ProfileService){}
  
  transactionList(accountType: string) {
   const url = environment.endpoints.transactions.transactionList(accountType);
       return this.http
	            .get(url)
	            .map(r => r)
              .catch(r => this.respUtils.onServiceError(r));;
  }

  accountInfo(accountType: string) {
     const url = environment.endpoints.client_account.accountInfo(accountType);
            return this.http
              .get(url)
              .map(r => r)
              .catch(r => this.respUtils.onServiceError(r));;
  }

  accountList() {
     const url = environment.endpoints.client_account.accountList;
  }

  depositApply(deposit: Deposit) {
     const url = environment.endpoints.transactions.deposit;
     const formData: FormData = new FormData();
     let account_id = this.profileSvc.getCashAccountID; 
     formData.append('account_id', account_id);
     formData.append("amount", deposit.amount);
	   formData.append("currency", deposit.currency);
     formData.append("deposit_date", deposit.dateTime);
  	 formData.append("bank_id", deposit.bank);
  	 if(deposit.doc){ 
  	  formData.append("doc", deposit.doc);
  	 }
  	 if(deposit.remark){
  	  formData.append("remark", deposit.remark);
  	 }
  	   return this.http
          .post(url, formData)
          .map(r => r)
          .catch(r => this.respUtils.onServiceError(r));
  }
 
   withdrawApply(withdraw: Withdraw) {
     const url = environment.endpoints.transactions.withdraw;
     const formData: FormData = new FormData();
     let account_id = this.profileSvc.getCashAccountID; 
     formData.append('account_id', account_id);
     formData.append("amount", withdraw.amount);
  	 formData.append("currency", withdraw.currency);
     formData.append("bank_name", withdraw.bankName);
     formData.append("bank_account_number", withdraw.accNumber.toString());
     formData.append("bank_account_holder", withdraw.accountHolder);
     if(withdraw.remark){
      formData.append("remark", withdraw.remark);
     }
  	   return this.http
          .post(url, formData)
          .map(r => r)
          .catch(r => this.respUtils.onServiceError(r));
  }
}
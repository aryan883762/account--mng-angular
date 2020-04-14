import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SiteApiResponseUtilities } from '../../shared/services/SiteApiResponse';
import { Account, AccountInfo } from '../manage-account/model';
import { IdentityPreview } from '../../shared/dialogs/identity-preview-dialog/models';
import { Profile } from '../manage-client/model';
import { Transaction } from '../manage-transaction/model';
@Injectable()
export class AdminService {

    private respUtils = new SiteApiResponseUtilities();
    constructor (private http: HttpClient) { }
  //profile
   getProfileList() {
     const url = environment.endpoints.admin.profile.profileList;
      return this.http
            .get(url)
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
   }

   updateUser(user: Profile) {
	  const url = environment.endpoints.admin.profile.update;
         let body = new URLSearchParams();
         body.set('user_id',user.id.toString());
         body.set('verified_email', user.verified_email.toString());
         body.set('verified_identity', user.verified_identity.toString());
         body.set('verified_address', user.verified_address.toString());
         body.set('verified_mobile', user.verified_mobile.toString());
         body.set('verified_bank_book', user.verified_bank_book.toString());
         body.set('verified_w8ban', user.verified_w8ban.toString());
         body.set('active', user.active.toString());
         return this.http
            .put(url, body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
   }

   updateUserInfo() {
      const url = environment.endpoints.admin.profile.updateInfo;
   }

   deleteUser(id: number){
      const url = environment.endpoints.admin.profile.deleteUser;
    const params = new HttpParams()
          .set('user_id', id.toString())

       return this.http
          .delete(url, {params})
          .map(r => r)
          .catch(r => this.respUtils.onServiceError(r));
   }

   verifyUserDocs(doc: IdentityPreview) {
     const url = environment.endpoints.admin.profile.verifyDoc;
        let body = new URLSearchParams();
         body.set('doc_id', doc.doc_id.toString());
         body.set('status', doc.status);
         body.set('reason', doc.reason);
         return this.http
            .put(url, body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
   }

   //account
   getAccountList(){
     const url = environment.endpoints.admin.account.accountList;
      return this.http
            .get(url)
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
   }

   accountInfo(account_id: number){
      const url = environment.endpoints.admin.account.accountInfo(account_id);
      return this.http
            .get(url)
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
   }

   updateAccount(account: Account){
    const url = environment.endpoints.admin.account.updateAccount;
         let body = new URLSearchParams();
         body.set('account_id', account.id.toString());

         // when Open account is dis-approved, allow client to update the form again
         if (!account.approved){
          account.complete = 0
         }

         body.set('complete', account.complete.toString());
         body.set('approved', account.approved.toString());
         
         return this.http
            .put(url, body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
   }

   checkApply(transaction: Transaction){
    const url = environment.endpoints.admin.transaction.checkApply;
        let body = new URLSearchParams();
         body.set('id', transaction.id.toString());
         body.set('status', transaction.status);
         body.set('reason', transaction.reason);
         return this.http
            .put(url, body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
   }

   updateAccountInfo(accountInfo: AccountInfo){
         const url = environment.endpoints.admin.account.updateAccountInfo;
         let body = new URLSearchParams();
              return this.http
            .put(url, body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
   }

   //transaction
   getTransactionList(){
     const url = environment.endpoints.admin.transaction.transactionList;
      return this.http
            .get(url)
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
   }

   getOpeningForm(accountID: any){
      const url = environment.endpoints.admin.account.openingFormPDF;
      let body = new URLSearchParams();
      body.set('account_id', accountID.toString());
      return this.http
              .post(url, body.toString(), {
                headers: new HttpHeaders()
                  .set('Content-Type', 'application/x-www-form-urlencoded')
              })
              .map(r=>r['pdfUrl'])
              .catch(r=> this.respUtils.onServiceError(r))
   }



}
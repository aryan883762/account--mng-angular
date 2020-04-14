import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SiteApiResponseUtilities } from './SiteApiResponse';
import { Observable, of, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';
import { IdentityVarification } from '../dialogs/identity-varification-dialog/models';
import { Subject } from 'rxjs/Subject';
// import { Personal,
//          EmploymentStatus,
//          InvestmentExperience,
//          OtherDisclosure,
//          SelectAccount,
//          UploadDocument
//             } from '../../account-account-opening/account/data/formData.model';

@Injectable()
export class ProfileService {

    private respUtils = new SiteApiResponseUtilities();
    constructor (private http: HttpClient) { }
    private getProfileInfoSource = new Subject<any>();
    public getProfileInfo$ = this.getProfileInfoSource.asObservable();
    
    getProfileInfo(profileID: any) {
    	this.getProfile(profileID).subscribe((res)=>{
    		this.getProfileInfoSource.next(res);
    	 })
    }

    get user() {
        let user = environment.profileData['user'];
        return user;
    }

    get docs() {
        let user = this.user;
        let docs = user['docs'];
        return docs;
    }

    get isAdmin(){
        let accType = localStorage.getItem('type');
        if(accType.toString().toLowerCase() == 'client'){
            return false;
        }
        return true;
    }

    get isEmailVarified(){
        let user = this.user;
    	return user['verified_email'];
    }

    get isAddressVarified(){
        let user = this.user;
    	return user['verified_address'];
    }

    get isMobileVarified(){
        let user = this.user;
    	return user['verified_mobile'];
    }
    
    get isAllDocumentVerified(){
        if(this.isIdentityVerified && this.isAddressVarified && this.isBankBookVerified){
            return true;
        }
        return false;
    }
    get userAccounts(){
        let user = this.user;
        let accounts = user['accounts'];
        return accounts;
    }

    get cashAccountInfo(){
           let accounts = this.userAccounts;
        if(this.hasCashAccount){
             let cashAccount = accounts['cash'];
             return cashAccount; 
        }else {
            return null;
        }
    }

     get marginAccountInfo(){
           let accounts = this.userAccounts;
        if(this.hasMarginAccount){
             let marginAccount = accounts['margin'];
             return marginAccount; 
        }else {
            return null;
        }
    }
    get getCashAccountID(){
        let accounts = this.userAccounts;
        if(this.hasCashAccount){
             let cashAccount = accounts['cash'];
             return cashAccount['id']; 
        }else {
            return null;
        }
    }

    get isIdentityVerified(){
        let user = this.user;
        return user['verified_identity'];
    }

    get isBankBookVerified(){
        let user = this.user;
        return user['verified_bank_book'];
    }

    get isW8banVerified(){
        let user = this.user;
        return user['verified_w8ban'];
    }

    get hasMarginAccount(){
        let user = this.user;
        return user['has_margin_account'];
    }

    get hasCashAccount(){
        let user = this.user;
        console.log(user);
        return user['has_cash_account'];
    }

    get isCashAccountCompleted(){
        let accounts = this.userAccounts;
        if(this.hasCashAccount){
             let cashAccount = accounts['cash'];
             return cashAccount['complete']; 
        }else{
            return 0;
        }
    }

    get isMarginAccountCompleted(){
        let accounts = this.userAccounts;
        if(this.hasMarginAccount){
             let marginAccount = accounts['margin'];
             return marginAccount['complete']; 
        }else{
            return 0;
        }

    }

    get balanceInCashAccount() {
      let accounts = this.userAccounts;
        if(this.hasCashAccount){
             let cashAccount = accounts['cash'];
             return (cashAccount['balance'])?cashAccount['balance']:'0.00'; 

        }else{
            return '0.00';
        }
    }

    get balanceInMarginAccount() {
       let accounts = this.userAccounts;
        if(this.hasMarginAccount){
             let marginAccount = accounts['margin'];
             return (marginAccount['balance'])?marginAccount['balance']:'0.00'; 
        }else{
            return '0.00';
        }
    }

    get ownerType(){
        return 1;
    }
    get isAddressProofUploaded() {
        let docs = this.docs;
    	if(docs['address']){
    		return true;
    	}
        return false;
    }

    get isIdCardUploaded(){
    	let docs = this.docs;
    	if(docs['id_card']){
    		return true;
    	}
        return false;
    }

	getProfile(profileSysId: number){
	
	     const url = environment.endpoints.profile.profile(profileSysId);
	      return this.http
	            .get(url)
	            .map(r => this.onGetSuccessful(r))
	            .catch(r => this.respUtils.onServiceError(r));

	    }

	   //chinese name, english name
	   updateUser(name_chinese: string, name_english: string){
	         const url = environment.endpoints.profile.updateUser;
	         let body = new URLSearchParams();
	         body.set('name_english', name_english);
	         body.set('name_chinese', name_chinese);
	         return this.http
	            .put(url, body.toString(), {
	              headers: new HttpHeaders()
	                .set('Content-Type', 'application/x-www-form-urlencoded')
	            })
	            .map(r => r)
	            .catch(r => this.respUtils.onServiceError(r));
	   }
	   
	   //password
	   updatePassword(data: any){
	      const url = environment.endpoints.profile.resetPassword;
	        let body = new URLSearchParams();
	        body.set('password', data.newPassword);
	        return this.http
	            .put(url,  body.toString(),
	            {
	              headers: new HttpHeaders()
	                .set('Content-Type', 'application/x-www-form-urlencoded')
	            })
	            .map(r => r)
	            .catch(r => this.respUtils.onServiceError(r));
	   }
	   
	   //email
	   updateEmail(){

	   }

       //other_information_disclosure_ids, tax_information_id, tax_country_id, tax_id, w8ben_country_id
	   updateOtherInformation(){

	   }

	   //securities_account_ids, found_account_ids
	   updateAccountType(){

	   }

       
       //upload address/id document(Identity verification)
	   uploadDoc(doc: IdentityVarification){
           const url = environment.endpoints.profile.uploadDoc;
           const formData: FormData = new FormData();
             formData.append('type', doc.documentType);
             formData.append("doc", doc.document);
			   return this.http
	            .post(url, formData)
	            .map(r => r)
	            .catch(r => this.respUtils.onServiceError(r));
	   }

		private onGetSuccessful(response) {
	        return response || null;
	    }
	    
 
}
import * as _ from 'lodash';
import { constants } from './constants';
export const environment = {
  siteDescription: "",
  siteTitle: "",

  siteApiUrl: constants.siteApiUrl,
  siteUrl: constants.siteUrl,
  siteImage: null,
  imageStorageUrl: null,
  pdfStorageUrl: constants.pdfStorageUrl,
  intercomKey: null,
  production: null,
  maintenance: false,
  attributes: null,
  profileData: null,
  accountType: null,
  storage: {
    auth: {
      accessToken: "access_token",
      profileSysId: "profileSysId",
      type: "type",
      thumbnailImageName: "thumbnailImageName",
      loginWithCRM: "loginWithCRM",
      refreshtoken: "refresh_token",
      userName: "username",
      isOnCRMSite: "isOnCRMSite",
      currentProfileSysId: "currentProfileSysId",
      fullName: "fullname",
    },
    language: "language"
  },

  site: {
    get url() {
      return environment.siteUrl;
    },

    get api() {
      return environment.siteApiUrl;
    },

    get login() {
      return `${environment.siteUrl}/login`;
    },

    profileUrl(profileSysId: number) {
      if (profileSysId) {;
        return `/profile/${profileSysId}`;
      }
      return null;
    },
    pdfViewerUrl(url: string) {
      return ``;
    },

    imageUrl(file: string) {
      return `${environment.imageStorageUrl}/${file}`
    },

    pdfUrl(file: string) {
      return `${environment.pdfStorageUrl}/${file}`
    },

    get getAccountType() {
       return environment.accountType;
    },

    get accountOpeningTermsURL() {
        return `${environment.pdfStorageUrl}/${constants.pdfFile.accountOpeningTermsFile}`;
    },

    get noticeOnRiskDisclosureURL() {
      return `${environment.pdfStorageUrl}/${constants.pdfFile.noticeOnRiskDisclosureFile}`;
    }
  },

  endpoints: {
    auth: {
      get url() {
        return `${environment.siteApiUrl}/authorise/emailLogin`;
      },
      get siteApiUrl() {
        return environment.siteApiUrl;
      },
      get signup() {
        return `${environment.siteApiUrl}/authorise/emailRegister`;
      },

      get activateAccount() {
        return `${environment.siteApiUrl}/authorise/activateAccount`;
      },

      get requestPassword() {
        return `${environment.siteApiUrl}/authorise/findPassword`
      }
     },
    profile: {
      profile(id: number) {
      return `${environment.siteApiUrl}/client_profile/user?id=${id}`;
      },

      get resetPassword() {
        return `${environment.siteApiUrl}/client_profile/user`;
      },
      
      get uploadDoc() {
         return `${environment.siteApiUrl}/client_profile/uploadDoc`;
      },

      get updateUser() {
         return `${environment.siteApiUrl}/client_profile/user`;
      },

      get updateInfo() {
         return `${environment.siteApiUrl}/client_profile/info`;
      }
     },

     client_account: {
      get openAccount() {
         return `${environment.siteApiUrl}/client_account/openSteps`;
       },

      get accountList() {
         return `${environment.siteApiUrl}/client_account/list`;
       },
       
      accountInfo(accountType: string) {
         return `${environment.siteApiUrl}/client_account/info?type=${accountType}`;
       }
     },

    transactions: {
      transactionList(accountType: string) {
        return `${environment.siteApiUrl}/client_transaction/list?type=${accountType}`;
      },

      get deposit() {
        return `${environment.siteApiUrl}/client_transaction/depositApply`;
      },

      get withdraw() {
        return `${environment.siteApiUrl}/client_transaction/withdrawApply`;
      }
    },
    admin: {
      profile: {
      get profileList() {
        return `${environment.siteApiUrl}/admin_profile/list`;
       },
      get update() {
        return `${environment.siteApiUrl}/admin_profile/update`;
       },
      get updateInfo() {
        return `${environment.siteApiUrl}/admin_profile/updateInfo`;
       },
      get deleteUser() { 
         return   `${environment.siteApiUrl}/admin_profile/user`;
       },

      get verifyDoc() {
         return   `${environment.siteApiUrl}/admin_profile/verifyDoc`;
       }
      },
      account: {
        get accountList() {
           return `${environment.siteApiUrl}/admin_account/list?type=cash`;
        },
        accountInfo(account_id: number) {
             return `${environment.siteApiUrl}/admin_account/info?account_id=${account_id}`;
        },

        get updateAccount(){
            return `${environment.siteApiUrl}/admin_account/update`;
        },

        get updateAccountInfo(){
            return `${environment.siteApiUrl}/admin_account/updateInfo`;
        },

        get openingFormPDF(){
            return `${environment.siteApiUrl}/admin_account/pdf`;
        }
      },
      transaction: {
        get transactionList() {
           return `${environment.siteApiUrl}/admin_transaction/list`;
        },
        get checkApply(){
            return `${environment.siteApiUrl}/admin_transaction/checkApply`;
        }
      }
    }
  },
  attribute: {
    getValues(type: string) {
         return environment.attributes[type];
    }
  }
}

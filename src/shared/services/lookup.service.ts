import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { COUNTRYCITY, CountryCity } from './country-city';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class LookupService {
  constructor(){}
  private HideLoaderLogoSource = new Subject<string>();
  public HideLoaderLogo$ = this.HideLoaderLogoSource.asObservable();
  
  HideLoaderLogo(res: string) {
      this.HideLoaderLogoSource.next(res);
  }

  getAttributeValues(type: string){
  	  let attributeData =  JSON.parse(localStorage.getItem('attributes')) || {}
  	  return _.get(attributeData, `attributes.${type}`);
    // return environment.attribute.getValues(type);
  }

  getCountryCityCode(): CountryCity[] {
    return COUNTRYCITY;
  }
 //  txt(translationKey) {
 //    let translate = JSON.parse(localStorage.getItem('translation')) || {}
 //    let lang = localStorage.getItem('language') || 'zh_CN';
	// return _.get(translate, `translations.${translationKey}.${lang}`, '_' + translationKey);
 //  }
}


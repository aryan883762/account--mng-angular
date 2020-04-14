import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {
  transform(translationKey: string): string {
  	let translate = JSON.parse(localStorage.getItem('translation')) || {}
    let lang = localStorage.getItem('language') || 'zh_CN';
    let text = _.get(translate, `translations.${translationKey}.${lang}`, '_' + translationKey); 
    if(lang == 'en_US'){
    	return text.charAt(0).toUpperCase() +  text.slice(1); 
    }else{
	return _.get(translate, `translations.${translationKey}.${lang}`, '_' + translationKey);  
	} 
  }
}
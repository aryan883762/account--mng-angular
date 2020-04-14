import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({name: 'prefix'})
export class PrefixPipe implements PipeTransform {
  transform(word: string): string {

      let firstChar =  (word.length>0)?word[0]:'';
      let x = firstChar.toUpperCase();
        if(x == "A" || x == "E" || x == "I" || x == "O" || x == "U"){
            return `an_text`;
        }
        return `a_text`;
  }
}
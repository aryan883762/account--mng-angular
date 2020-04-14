import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'success-checkmark',
  template: `<div class="success-checkmark">
                <div class="check-icon">
                    <span class="icon-line line-tip"></span>
                    <span class="icon-line line-long"></span>
                    <div class="icon-circle"></div>
                    <div class="icon-fix"></div>
                </div>
            </div>`,
  styleUrls: ['./style.less']
})
export class SuccessCheckmarkComponent {

      constructor () {
    }

  ngOnInit() {
   
  }

  ngOnDestroy() {
 
  }

}

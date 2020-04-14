import { Component, OnInit, OnChanges, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxItem } from './checkboxItem';
@Component({
    selector: 'checkbox-group',
    templateUrl: './checkbox-group.component.html'
    })
export class CheckboxGroupComponent implements OnInit {
    @Input() options = Array<CheckboxItem>();
    @Input() title: string;
    @Input() selectedValues: number[];
    @Output() toggle = new EventEmitter<any[]>();
    @Input() isSubmitted: boolean;
    constructor() {}
    ngOnInit(){
    }

    onToggle() {

        const checkedOptions = this.options.filter(x => x.checked);
        this.selectedValues = checkedOptions.map(x => x.id);
        console.log(this.selectedValues)
        this.toggle.emit(checkedOptions.map(x => x.id));
    }

    }
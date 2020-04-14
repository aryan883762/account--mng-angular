import { Component, OnInit, OnChanges, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { RadiobuttonItem } from './radiobuttonItem';
@Component({
    selector: 'radioButton-group',
    templateUrl: './radiobutton-group.component.html'
    })
export class RadioButtonGroupComponent implements OnInit {
    @Input() options = Array<RadiobuttonItem>();
    @Input() title: string;
    @Input() groupName: string;
    @Input() selectedValues: number[];
    @Output() toggle = new EventEmitter<number>();
    @Input() isSubmitted: boolean;
    selectedID: number = 0;
    constructor() {}
    ngOnInit(){
    }

    onToggle() {
        this.toggle.emit(this.selectedID);
    }

    }
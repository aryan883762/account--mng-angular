export class RadiobuttonItem {
    id: number;
    name: string;
    checked: boolean;
    constructor(id: any, name: any, checked?: boolean) {
     this.id = id;
     this.name = name;
     this.checked = checked ? checked : false;
    }
   }
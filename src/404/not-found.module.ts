import { CommonModule } from "@angular/common";
import { NotFoundComponent } from "./not-found.component";
import { NgModule } from "@angular/core";
import { NotFoundRoutingModule } from "./not-found-routing.module";

@NgModule({
    imports: [ 
        CommonModule,
        NotFoundRoutingModule
    ],
    declarations: [
        NotFoundComponent
    ],
    exports: [ 
        NotFoundComponent 
    ],
    providers: [
    ]
})
export class NotFoundModule {}
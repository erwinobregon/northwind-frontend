import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,RouterModule
  ],
  exports:[
    NavBarComponent
  ],
  declarations: [NavBarComponent, NotFoundComponent]
})
export class SharedModule { }

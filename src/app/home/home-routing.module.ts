import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent}  from './home/home.component';


const homeRoutes : Routes=[
 {
   path :'',
   children:[
     {
       path:'',
       component: HomeComponent
     }
   ]
 }
];

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(homeRoutes)
  ],

  exports:[RouterModule],
  declarations: []
})
export class HomeRoutingModule { }

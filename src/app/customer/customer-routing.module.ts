import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/role.enum';


const customerRoutes: Routes=[
  {
    path:'',
    children:[
      {
      path:'',
      component: CustomerListComponent
      }
    ],
    canActivate: [AuthGuard],
    data: { expectRole: Role.AdminSupplier}
  }
];
@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(customerRoutes)
  
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class CustomerRoutingModule { }

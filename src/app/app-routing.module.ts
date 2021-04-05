import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes=[ 

  {
    path:'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canLoad:[AuthGuard]
    //loadChildren:'./home/home.module#HomeModule'
   
  },
  {
    path:'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canLoad:[AuthGuard]
     //loadChildren: './customer/customer.module#CustomerModule'

  },
  {
    path: 'login', 
    component:LoginComponent
  },

  {
    path: 'logout', 
    component:LogoutComponent
  },
  {
    path: '', redirectTo:'/login', pathMatch: 'full'
  },
  {
    path: '**', component:NotFoundComponent
  }

];
@NgModule({
 imports:[
   RouterModule.forRoot(appRoutes)
 ],
 exports: [RouterModule],
 declarations:[]
})
export class AppRoutingModule { }

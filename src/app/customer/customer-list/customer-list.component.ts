import { Component } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from './customer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NewCustomerComponent } from '../new-customer/new-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { DetailCustomerComponent } from '../detail-customer/detail-customer.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers:[CustomerService]
})
export class CustomerListComponent {

  customers: Customer[]=[];
  numberOfRecord: number=0;
  pageSizeOptions:number[]=[10,20,30];
  pageSize: number=10;
  pageIndex: number=0;

  constructor(private customerService: CustomerService, private dialog:MatDialog ) {
    this.getCustomer(1,this.pageSize);
   }

  
  getCustomer(page:number, rows:number): void{
      this.customerService.getCustomerList(page,rows)
      .subscribe(
        response=>{this.customers=response;
        this.numberOfRecord=response[0].totalRecords;
      });
  }

  changePage(event:any):void
  {
    this.getCustomer(event.pageIndex+1, event.pageSize);
  }

  newCustomer():void{
    const dialogRef = this.dialog.open(NewCustomerComponent, {
     panelClass:"new_customer-modal-dialog"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCustomer(1,this.pageSize);
    });
  }

  editCustomer(id:number):void
  {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      panelClass:"new_customer-modal-dialog",
      data: {id:id}
     });
 
     dialogRef.afterClosed().subscribe(result => {
       this.getCustomer(1,this.pageSize);
     });

  }
  viewDetails(id:number):void
  {
    const dialogRef = this.dialog.open(DetailCustomerComponent, {
      panelClass:"new_customer-modal-dialog",
      data: {id:id}
     });
 
     dialogRef.afterClosed().subscribe(result => {
       this.getCustomer(1,this.pageSize);
     });
    
  }

}


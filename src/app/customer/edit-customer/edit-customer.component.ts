import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddOrEditCustomer } from '../models/AddorEditCustomer';
import { EditCustomerService } from './edit-customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { WhiteSpaceValidators } from 'src/app/shared/validators/whiteSpaceValidators';

export interface DialogData{
  id:number;
}

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  providers: [EditCustomerService]
})
export class EditCustomerComponent implements OnInit {
  newCustomerForm: FormGroup;
  customer: AddOrEditCustomer;
  constructor(private service: EditCustomerService, private fb:FormBuilder,
    public dialogRef: MatDialogRef<EditCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data :DialogData)
    {
        this.customerRetrieved(data.id);
    }
  
    ngOnInit(): void {
      this.buildNewCustomerForm();
    }
  
    buildNewCustomerForm(): void
    {
      this.newCustomerForm=this.fb.group({
          firstName: ['', [Validators.required, WhiteSpaceValidators.cannotContaintSpace]],
          lastName: ['', Validators.compose( [Validators.required, WhiteSpaceValidators.cannotContaintSpace])],
          city: ['', Validators.compose( [Validators.required, WhiteSpaceValidators.cannotContaintSpace])],
          country: ['', Validators.compose( [Validators.required, WhiteSpaceValidators.cannotContaintSpace])],
          phone: ['', Validators.compose( [Validators.required, WhiteSpaceValidators.cannotContaintSpace])]
  
      });
    }
    


customerRetrieved(id:number): void
{
  this.service.getCustomerById(id)
  .subscribe(response=>{
  this.customer= response;
  this.newCustomerForm.patchValue({
   firstName: response.firstName,
   lastName:  response.lastName,
   city: response.city,
   country: response.country,
   phone: response.phone

  });    
  });
}

save():void{
  if (this.newCustomerForm.dirty && this.newCustomerForm.valid) {
    const p =Object.assign({}, this.customer, this.newCustomerForm.value)
    p.id= this.data.id;
    this.service.editCustomer(p)
    .subscribe(response=>{
    this.dialogRef.close();
    });
  }else if (!this.newCustomerForm.dirty) {
    this.newCustomerForm.reset();
  }
  
}
}

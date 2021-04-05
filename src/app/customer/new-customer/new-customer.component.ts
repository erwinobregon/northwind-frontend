import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddOrEditCustomer } from '../models/AddorEditCustomer';
import { WhiteSpaceValidators } from '../../shared/validators/whiteSpaceValidators';
import { NewCustomerService } from './new-customer.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
  providers:[NewCustomerService]
})
export class NewCustomerComponent implements OnInit {
  newCustomerForm: FormGroup;
  customer: AddOrEditCustomer;
  constructor(private fb:FormBuilder, private service: NewCustomerService,
              public dialogRef: MatDialogRef<NewCustomerComponent>) { }


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

  save(): void
  {
    if (this.newCustomerForm.dirty && this.newCustomerForm.valid) {
      const p = Object.assign({}, this.customer,this.newCustomerForm.value); 
      this.service.saveCustomer(p)
      .subscribe(response=>{
        this.dialogRef.close();
      })
    }else if(!this.newCustomerForm.dirty){
      this.newCustomerForm.reset();
      
    }
  

  }

}

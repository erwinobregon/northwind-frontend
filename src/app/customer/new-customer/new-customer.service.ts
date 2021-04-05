import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddOrEditCustomer } from '../models/AddorEditCustomer';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewCustomerService {

  constructor(private http:HttpClient) { }

  saveCustomer(data: AddOrEditCustomer):Observable<Response>{
    data.id=undefined;
    return this.http.post(`${environment.urlServices}/customer`,data)
    .pipe(
      map((response:any)=>response));

  }
}



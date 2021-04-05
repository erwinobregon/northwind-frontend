import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddOrEditCustomer } from '../models/AddorEditCustomer';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditCustomerService {

  constructor(private http:HttpClient) { }

  getCustomerById(int:number):Observable<AddOrEditCustomer>{
    return this.http.get<AddOrEditCustomer>(`${environment.urlServices}/customer/${int}`);
  }

  editCustomer(data: AddOrEditCustomer):Observable<Response>{
    return this.http.put(`${environment.urlServices}/customer`,data)
    .pipe(
      map((response:any)=>response));

  }
}

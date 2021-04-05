import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  
  getCustomerList(page:number, rows: number): Observable<Customer[]>
  {
    return this.http.get<Customer[]>(`${environment.urlServices}/Customer/GetPaginatedCustomer/${page}/${rows}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOrEditCustomer } from '../models/AddorEditCustomer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailCustomerService {

  constructor(private http: HttpClient) {}


  getCustomerById(int:number):Observable<AddOrEditCustomer>{
    return this.http.get<AddOrEditCustomer>(`${environment.urlServices}/customer/${int}`);
  }
}

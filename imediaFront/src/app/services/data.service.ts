import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 

  }

  getCompanyInfo(tva:any): Observable<any> {
    console.log(tva)
    return this.http.post('http://localhost:3000/tva', tva)
  }

  addCustomer(info:any):Observable<any> {
    console.log(info)
    return this.http.post('http://localhost:3000/addCustomer', info)
  }
}

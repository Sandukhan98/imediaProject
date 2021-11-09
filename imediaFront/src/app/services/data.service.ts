import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.post('http://192.168.1.60:3000/tva', tva)
  }

  addCustomer(info:any):Observable<any> {
    console.log(info)
    return this.http.post('http://192.168.1.60:3000/addCustomer', info)
  }

  verifyExistence(email:any): Observable<any> {
    console.log(email)
    return this.http.post('http://192.168.1.60:3000/exist', email)
  }

  addWorkorder(customerID:any): Observable<any> {
    console.log(customerID)
    return this.http.post('http://192.168.1.60:3000/workorder', customerID)
  }

  getPub() : Observable<any> {
    return this.http.get('http://localhost:3000/pubfiles')
  }

}

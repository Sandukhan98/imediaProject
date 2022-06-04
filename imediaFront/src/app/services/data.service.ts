import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  serverIp : string = "";
  interval :any;
  constructor(private http: HttpClient) { 
    this.interval = setInterval(() => {
      this.http.get("https://imedia-38182-default-rtdb.europe-west1.firebasedatabase.app/ip.json").subscribe((res) => {
        this.serverIp = res as string;
      })
    }, 1000);
  }

  getCompanyInfo(tva:any): Observable<any> {
    console.log(tva)
    return this.http.post('http://'+ this.serverIp +':3000/tva', tva)
  }

  addCustomer(info:any):Observable<any> {
    console.log(info)
    return this.http.post('http://'+ this.serverIp +':3000/addCustomer', info)
  }

  verifyExistence(email:any): Observable<any> {
    console.log(email)
    return this.http.post('http://'+ this.serverIp +':3000/exist', email)
  }

  addWorkorder(customerID:any): Observable<any> {
    console.log(customerID)
    return this.http.post('http://'+ this.serverIp +':3000/workorder', customerID)
  }

  getPub() : Observable<any> {
    return this.http.get('http://'+ this.serverIp +':3000/pubfiles')
  }

  getTimeOut() : Observable<any>{
    return this.http.get('http://'+ this.serverIp +':8000/config/config.json')
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
  private createRequestOptions(): { headers: HttpHeaders } {
   
    const token = 'Bearer ' + sessionStorage.getItem('token');
    // Define the headers
    const headers = new HttpHeaders({
      'Authorization': token
    });

    // Define the request options
    const requestOptions = {
      headers: headers
    };

    return requestOptions;
  }

  baseUrl="http://localhost:9001/payment";
  getPaymentList():Observable<any>{
    // console.log("******");
    return this.http.get(`${this.baseUrl}/getAllPayment`);
  }
 deletePayment(bookingId:any):Observable<any>{
  const requestOptions = this.createRequestOptions();
  return this.http.delete<string>(`${this.baseUrl}/deletePayment/${bookingId}`, requestOptions);
 }
 updatePayment(bookingId:any,status:any):Observable<any>{
  const requestOptions = this.createRequestOptions();
  return this.http.put<string>(`${this.baseUrl}/updatePayment/${bookingId}/${status}`, requestOptions);

 }
  
}

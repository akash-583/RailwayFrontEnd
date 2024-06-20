import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  constructor(private http: HttpClient) { }

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

  baseUrl = "http://localhost:9001/registration/authorization"


  getAllUsers(): Observable<any[]> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any[]>(`${this.baseUrl}/getAllUsers`, requestOptions);
  }

}

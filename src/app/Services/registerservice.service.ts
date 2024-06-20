import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {

  constructor(private http:HttpClient) { }
  
  baseUrl = "http://localhost:9001/register"

  signupUser(data : any):Observable<any>{
    console.log("******"+data);

    return this.http.post(`${this.baseUrl}/addUser` , data);

  }
}

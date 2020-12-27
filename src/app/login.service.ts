import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string;

  constructor(private http: HttpClient){
    this.apiUrl = "http://localhost:5454/login";
  }

  tryLogin(User): Observable<any>{

    console.log(User.username)
    console.log(User.password)

    return this.http.post<any>(this.apiUrl,User)
  }
  
}
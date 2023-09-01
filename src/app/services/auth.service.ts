import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'access_token';
  constructor(private http: HttpClient) {}

  login(loginDto:{username: string, password: string}) {
      this.http.post('http://localhost:8080/api/auth/login',loginDto, { observe: 'response' }).subscribe(response => {
    const headers = response.headers;
  //  console.log(headers);
  });
   /**   .pipe(
        map((response:HttpResponse<any>) => {
         const authorizationHeader = response.headers.get('Authorization');
         console.log(response.headers.get('Authorization'))
        })
      );**/
  }
  setAccessToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}


import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  baseurl = 'http://localhost:4200/api/';
  
  login(model:any) {
    return this.http.post(this.baseurl + 'account/login', model);
  }
}

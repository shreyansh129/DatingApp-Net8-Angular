import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { user } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseurl = environment.apiUrl;
  private http = inject(HttpClient);

  getUserRoles(){
    return this.http.get<user[]>(this.baseurl + 'admin/users-with-roles')
  }

  updateUserRoles(username: string, roles: string[]){
    return this.http.post<string[]>(this.baseurl + 'admin/edit-roles/' 
      + username + '?roles=' + roles, {})
  }
}

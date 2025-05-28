import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model, signal } from '@angular/core';
import { user } from '../_model/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  baseurl = environment.apiUrl;
  currentUser = signal<user | null>(null);

  login(model: any) {
    return this.http.post<user>(this.baseurl + 'account/login', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  register(model: any) {
    return this.http.post<user>(this.baseurl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}

import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, model, signal } from '@angular/core';
import { user } from '../_model/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  private likeService = inject(LikesService);
  private presenceService = inject(PresenceService);
  baseurl = environment.apiUrl;
  currentUser = signal<user | null>(null);
  roles = computed(() => {
    const user = this.currentUser();
    if(user && user.token){
      const role = JSON.parse(atob(user.token.split('.')[1])).role
      return Array.isArray(role) ? role : [role];
    }
    return [];
  })

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
    this.likeService.getLikeIds();
    this.presenceService.createHubConnection(user)
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.presenceService.stopHubConnection();
  }
}

import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { DiscordAuthResponse } from '../components/bots/models/discord-auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  lsKey: string = 'discord-access-token';

  constructor() {}

  login(authResponse: DiscordAuthResponse): Observable<any> {
    if (authResponse) {
      const stringOfAuthData = window.btoa(JSON.stringify(authResponse));
      localStorage.setItem(this.lsKey, stringOfAuthData);
      return of(new HttpResponse({ status: 200 }));
    }
    return of(new HttpResponse({ status: 401 }));
  }
  logout() {
    localStorage.removeItem(this.lsKey);
  }

  isUserLoggedIn(): boolean {
    const loginToken = this.getLoginToken();
    if (!loginToken) {
      return false;
    }

    try {
      const parsedToken = JSON.parse(
        window.atob(loginToken)
      ) as DiscordAuthResponse;
      const expireTime = new Date(parsedToken.expireTime);
      if (expireTime < new Date()) {
        this.logout();
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error parsing token', e);
      this.logout();
      return false;
    }
  }

  getLoginToken() {
    return localStorage.getItem(this.lsKey);
  }

  logInWithDiscord(urlToComeBackTo: string = '') {
    const redirectUrlDomain = window.location.host;
    const protocol = window.location.protocol.replace(':', '');
    const paramsToSend = {
      url: urlToComeBackTo ? urlToComeBackTo : '/bots',
    };
    const encodedParams = btoa(JSON.stringify(paramsToSend));
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=1083874894867091526&state=${encodedParams}&redirect_uri=${protocol}%3A%2F%2F${redirectUrlDomain}%2Fcallback&response_type=code&scope=identify%20guilds%20guilds.members.read`;
    window.location.href = discordAuthUrl;
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { DiscordAuthResponse } from 'src/app/components/bots/models/discord-auth-response';
import { DiscordRedirectState } from 'src/app/components/bots/models/discord-redirect-state';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DiscordService } from 'src/app/services/discord.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss'],
    standalone: true,
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthenticationService,
    private discordService: DiscordService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (!params || !params['code']) {
        this.redirect();
      }
      this.discordService
        .getAccessToken(params['code'])
        .pipe(take(1))
        .subscribe({
          next: (response: DiscordAuthResponse) => {
            if (response.access_token) {
              let expireTime = new Date();
              expireTime.setSeconds(
                expireTime.getSeconds() + response.expires_in
              );
              response.expireTime = expireTime.toISOString();
              this.authService.login(response);
            } else {
              console.error('No access token in response.', response);
            }

            if (params['state']) {
              const state = this.decodeState(params['state']);
              if (!state || !state.url || state.url.trim() === '') {
                this.redirect();
              }
              this.redirect(state?.url);
            } else {
              this.redirect();
            }
          },
          error: (error) => {
            console.error(error);
            this.redirect();
          },
        });
    });
  }
  redirect(url: string = '') {
    if (url.length > 0) {
      this.router.navigate([url]);
    } else {
      this.router.navigate(['/']);
    }
  }
  decodeState(stateBase64: string): DiscordRedirectState | null {
    const stateJsonString = atob(stateBase64);
    const state = JSON.parse(stateJsonString);
    if (state) {
      return state as DiscordRedirectState;
    }
    return null;
  }
}

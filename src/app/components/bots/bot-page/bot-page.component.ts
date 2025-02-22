import { Component, Injector } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DiscordService } from 'src/app/services/discord.service';
import { ReplybotService } from 'src/app/components/bots/replybot/replybot.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TimezonebotService } from 'src/app/components/bots/timezonebot/timezonebot.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-page',
  templateUrl: './bot-page.component.html',
  styleUrls: ['./bot-page.component.scss'],
  standalone: true,
})
export class BotPageComponent {
  constructor(
    public authService: AuthenticationService,
    public discordService: DiscordService,
    public replybotService: ReplybotService,
    public timeZoneBotService: TimezonebotService,
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public clipboard: Clipboard
  ) {}

  isLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  logInWithDiscord(urlToComeBackTo: string = '') {
    this.authService.logInWithDiscord(urlToComeBackTo);
  }

  logOutAndRedirect() {
    this.authService.logout();
    this.router.navigate(['bots']);
  }

  logOut() {
    this.authService.logout();
  }

  getLoginToken() {
    return this.authService.getLoginToken();
  }

  showSnackBar(messageToDisplay: string, isError: boolean, action?: string) {
    this.snackbar.open(messageToDisplay, action, {
      duration: 5000,
      horizontalPosition: 'center',
      panelClass: isError ? 'snackbar-error' : 'snackbar-success',
    } as MatSnackBarConfig<any>);
  }
}

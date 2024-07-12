import { Component, OnInit } from '@angular/core';
import { take, forkJoin, map, timeout, throwError } from 'rxjs';
import { BotPageComponent } from 'src/app/components/bots/bot-page/bot-page.component';
import { SetTimeZoneRequest } from 'src/app/components/bots/models/timezonebot/set-time-zone-request';
import { TimeZoneDataSource } from 'src/app/components/bots/models/timezonebot/time-zone-data-source';
import { TimeZoneItem } from 'src/app/components/bots/models/timezonebot/time-zone-item';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { LoadingIndicatorComponent } from 'src/app/components/shared/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-timezones',
  templateUrl: './timezones.component.html',
  styleUrls: ['./timezones.component.scss'],
  standalone: true,
  imports: [
    PageTitleComponent,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    ClipboardModule,
    LoadingIndicatorComponent,
  ],
})
export class TimezonesComponent extends BotPageComponent implements OnInit {
  public isLoading: boolean;
  public isTimeZoneLoading: boolean;
  public timeZones: TimeZoneItem[];
  public selectedFilter?: string = undefined;
  public filterText: string;
  public timeZonesFiltered: TimeZoneItem[];
  public timeZoneFilterOptions: string[];
  public timeZoneDataSource: TimeZoneDataSource;
  public discordUser: any;

  public displayedColumns: string[] = ['set-button', 'copy-button', 'timezone-id'];
  public dataSource: TimeZoneItem[];
  public currentTimeZone: string;
  public currentTime: string;

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.isLoading = true;
      const accessToken = this.getLoginToken();
      forkJoin([
        this.timeZoneBotService.getTimeZones(),
        this.discordService.getDiscordUser(accessToken!),
      ])
        .pipe(
          timeout({
            each: 10000,
            with: () => throwError(() => new Error('Timed out waiting for response.')),
          }),
          map(([timeZones, discordUser]) => {
            return {
              timeZones,
              discordUser,
            };
          })
        )
        .subscribe({
          next: (result: { timeZones: TimeZoneItem[]; discordUser: any }) => {
            this.timeZones = result.timeZones;
            this.timeZonesFiltered = result.timeZones;
            this.discordUser = result.discordUser;
            this.populateFilterOptions();
            this.dataSource = this.timeZonesFiltered;
            this.updateCurrentTimeZone(this.discordUser.id.toString());
            this.isLoading = false;
          },
          error: (error) => {
            console.error(error);
            this.showSnackBar(
              'Error retrieving page data. Login may have expired, please log in and try again.',
              true
            );
            window.setTimeout(() => this.logOutAndRedirect(), 3000);
          },
        });
    }
  }

  public filterTimeZones() {
    let timeZonesFiltered = this.timeZones;
    if (this.selectedFilter) {
      timeZonesFiltered = this.timeZones.filter(
        (t) =>
          t.continent?.toLowerCase() === this.selectedFilter?.toLowerCase() ||
          t.id.toLowerCase() === this.selectedFilter?.toLowerCase()
      );
    }
    if (this.filterText && this.filterText.trim().length > 0) {
      timeZonesFiltered = timeZonesFiltered.filter((t) =>
        t.id.toLowerCase().includes(this.filterText.toLowerCase().trim())
      );
    }

    this.dataSource = timeZonesFiltered;
  }

  public clearFilter() {
    this.selectedFilter = undefined;
    this.filterText = '';
    this.filterTimeZones();
  }

  public populateFilterOptions() {
    const timeZoneFilterNames = this.timeZones
      .filter((t) => t.continent || !t.id.includes('/'))
      .map((t) => {
        if (t.continent) {
          return t.continent;
        }
        return t.id; //this should be timezones without an ID with a slash format
      });
    let timeZoneFilterNamesDistinct: string[] = [];
    timeZoneFilterNames.forEach((n) => {
      if (!timeZoneFilterNamesDistinct.includes(n)) {
        timeZoneFilterNamesDistinct.push(n);
      }
    });
    this.timeZoneFilterOptions = timeZoneFilterNamesDistinct;
  }

  public formatCurrentTimeZone() {
    if (this.currentTimeZone) {
      return this.currentTimeZone;
    } else {
      return 'Not Set';
    }
  }

  public updateCurrentTimeZone(userId: string) {
    this.isTimeZoneLoading = true;
    const accessToken = this.getLoginToken();
    this.timeZoneBotService
      .getTimeZoneForUser(accessToken!, userId)
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          this.currentTimeZone = data.timeZone;
          this.currentTime = data.currentTime;
          this.isTimeZoneLoading = false;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  public setTimeZone(timeZoneId: string) {
    const accessToken = this.getLoginToken();
    this.discordService.getDiscordUser(accessToken!).subscribe({
      next: (discordUser: any) => {
        const bodyToUse: SetTimeZoneRequest = {
          accessToken: accessToken,
          userId: discordUser.id,
          timeZoneId: timeZoneId,
        };
        this.timeZoneBotService.setTimeZone(bodyToUse).subscribe({
          next: (success) => {
            if (success) {
              this.showSnackBar(`Successfully changed your time zone to ${timeZoneId}`, false);
              this.updateCurrentTimeZone(discordUser.id);
            } else {
              console.error('Error setting TimeZone: API returned false');
              this.showSnackBar('There was an error setting your time zone.', true);
            }
          },
          error: (error) => {
            console.error('Error setting TimeZone:', error);
            this.showSnackBar('There was an error setting your time zone.', true);
          },
        });
      },
      error: (error) => {
        console.error('Error retrieving Discord user:', error);
        this.showSnackBar('There was an error setting your time zone.', true);
      },
    });
  }

  public formatUtcOffset(utcOffset: number): string {
    if (utcOffset >= 0) {
      return `+${utcOffset}`;
    }
    return `${utcOffset}`;
  }

  public copyTimeZone(timeZone: string) {
    if (this.clipboard.copy(timeZone)) {
      this.showSnackBar('Copied Time Zone ID to clipboard!', false);
    } else {
      this.showSnackBar('There was a problem copying. Please try again.', true);
    }
  }
}

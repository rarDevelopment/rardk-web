import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { GuildConfiguration } from 'src/app/components/bots/models/replybot/guild-configuration';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';
import { switchMap, take } from 'rxjs';
import { BotPageComponent } from '../../bot-page/bot-page.component';

@Component({
  selector: 'app-guild-configuration',
  templateUrl: './guild-configuration.component.html',
  styleUrls: ['./guild-configuration.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipDirective],
})
export class GuildConfigurationComponent extends BotPageComponent implements OnInit {
  public guildConfiguration: GuildConfiguration;
  public isLoading = false;

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        take(1),
        switchMap((params) => {
          // Extract guildId from query params
          const guildId = params['guildId'];
          const accessToken = this.getLoginToken();
          if (guildId) {
            // If guildId is present, fetch the guild configuration
            return this.replybotService.getReplybotGuildConfiguration(accessToken!, guildId);
          }
          return [];
        })
      )
      .subscribe({
        next: (result: GuildConfiguration) => {
          // Initialize the guild configuration with the fetched data
          this.guildConfiguration = result;
        },
        error: (error) => {
          console.error('Error fetching guild configuration:', error);
        },
      });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['guildConfiguration'] && this.guildConfiguration) {
  //     // Create a deep copy for editing
  //     this._guildConfiguration = JSON.parse(JSON.stringify(this.guildConfiguration));
  //   }
  // }

  saveConfiguration(): void {
    const accessToken = this.getLoginToken();
    if (!accessToken) {
      this.snackbarService.showSnackBar('Authentication error. Please log in again.', true);
      this.logOutAndRedirect();
      return;
    }
    this.isLoading = true;

    const guildConfigurationWithAccessToken = {
      ...this.guildConfiguration,
      accessToken: accessToken,
    };

    this.replybotService
      .updateReplybotGuildConfiguration(guildConfigurationWithAccessToken)
      .pipe(take(1))
      .subscribe({
        next: (savedConfig) => {
          if (savedConfig) {
            console.log('Guild configuration saved successfully', savedConfig);
            this.snackbarService.showSnackBar('Server configuration saved successfully!', false);
            this.isLoading = false;
          } else {
            console.error('Failed to save guild configuration');
            this.snackbarService.showSnackBar(
              'Failed to save server configuration. Please try again.',
              true
            );
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error('Error saving guild configuration', err);
          this.snackbarService.showSnackBar(
            'Failed to save server configuration. Please try again.',
            true
          );
          this.isLoading = false;
        },
      });
  }

  public backToDefinitions(): void {
    // Navigate back to the definitions page
    this.router.navigate(['bots/replybot/reply-definitions'], {
      queryParams: { guildId: this.guildConfiguration.guildId },
    });
  }

  isNumericString(value: string): boolean {
    return !!value && /^\d+$/.test(value);
  }
}

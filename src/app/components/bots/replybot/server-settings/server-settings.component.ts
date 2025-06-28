import { Component, OnInit } from '@angular/core';
import { GuildConfiguration } from 'src/app/components/bots/models/replybot/guild-configuration';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';
import { switchMap, take } from 'rxjs';
import { BotPageComponent } from '../../bot-page/bot-page.component';
import { LoadingIndicatorComponent } from 'src/app/components/shared/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-server-settings',
  templateUrl: './server-settings.component.html',
  styleUrls: ['./server-settings.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipDirective, LoadingIndicatorComponent],
})
export class ServerSettingsComponent extends BotPageComponent implements OnInit {
  public guildConfiguration: GuildConfiguration;
  public editableGuildConfiguration: GuildConfiguration;
  public isLoading = false;

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        take(1),
        switchMap((params) => {
          const guildId = params['guildId'];
          const accessToken = this.getLoginToken();
          if (guildId) {
            return this.replybotService.getReplybotGuildConfiguration(accessToken!, guildId);
          }
          return [];
        })
      )
      .subscribe({
        next: (result: GuildConfiguration) => {
          // Initialize the guild configuration with the fetched data
          this.guildConfiguration = result;
          // Create a deep copy for editing
          this.editableGuildConfiguration = JSON.parse(JSON.stringify(this.guildConfiguration));
        },
        error: (error) => {
          console.error('Error fetching guild configuration:', error);
        },
      });
  }

  saveConfiguration(): void {
    const accessToken = this.getLoginToken();
    if (!accessToken) {
      this.snackbarService.showSnackBar('Authentication error. Please log in again.', true);
      this.logOutAndRedirect();
      return;
    }
    this.isLoading = true;

    const guildConfigurationWithAccessToken = {
      ...this.editableGuildConfiguration,
      accessToken: accessToken,
    };

    this.replybotService
      .updateReplybotGuildConfiguration(guildConfigurationWithAccessToken)
      .pipe(take(1))
      .subscribe({
        next: (savedConfig) => {
          console.log('Guild configuration saved successfully', savedConfig);
          this.snackbarService.showSnackBar('Server configuration saved successfully!', false);
          this.guildConfiguration = JSON.parse(JSON.stringify(this.editableGuildConfiguration));
          this.isLoading = false;
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

  areConfigurationsEqual(): boolean {
    if (!this.guildConfiguration && !this.editableGuildConfiguration) {
      return true;
    }
    if (!this.guildConfiguration || !this.editableGuildConfiguration) {
      return false;
    }
    return (
      JSON.stringify(this.guildConfiguration) === JSON.stringify(this.editableGuildConfiguration)
    );
  }

  isNumericString(value: string): boolean {
    return !!value && /^\d+$/.test(value);
  }
}

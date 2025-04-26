import { Component, OnInit } from '@angular/core';
import { BotPageComponent } from './bot-page/bot-page.component';
import { BotDefinition } from 'src/app/components/bots/models/bot-definition';
import { finalize, take } from 'rxjs';

import { LoginActionsComponent } from './login-actions/login-actions.component';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss'],
  imports: [PageTitleComponent, LoginActionsComponent, RouterLink],
})
export class BotsComponent extends BotPageComponent implements OnInit {
  public isLoading: boolean;
  public bots: BotDefinition[] = [
    {
      name: 'TimeZoneBot',
      imageUrl: 'assets/bots/timezonebot.webp',
      inviteLink:
        'https://discord.com/api/oauth2/authorize?client_id=736720417166721105&permissions=414464859200&scope=bot%20applications.commands',
      description:
        'A Discord Bot for easily converting times in a Discord server. It can also remind you about birthdays!',
      isConfigurable: true,
      requiresLogin: false,
      controlPanelLink: '/bots/timezonebot',
      gitHubLink: 'https://github.com/rarDevelopment/timezone-bot-dotnet',
    } as BotDefinition,
    {
      name: 'Toby the ReplyBot',
      imageUrl: 'assets/bots/replybot.webp',
      inviteLink:
        'https://discord.com/api/oauth2/authorize?client_id=737404113624498347&permissions=1757015219633399&scope=bot%20applications.commands',
      description:
        'A Discord Bot with a personality, including built-in replies, custom replies, and useful features.',
      isConfigurable: true,
      requiresLogin: true,
      controlPanelLink: '/bots/replybot',
      gitHubLink: 'https://github.com/rarDevelopment/replybot-dotnet',
    } as BotDefinition,
    {
      name: 'RoleBot',
      imageUrl: 'assets/bots/rolebot.webp',
      inviteLink:
        'https://discord.com/api/oauth2/authorize?client_id=740381594669285466&permissions=139855349840&scope=bot%20applications.commands',
      description: 'A Discord Bot for easily creating roles and letting users manage those roles.',
      isConfigurable: false,
      gitHubLink: 'https://github.com/rarDevelopment/role-bot-dotnet',
    } as BotDefinition,
    {
      name: 'PinBot',
      imageUrl: 'assets/bots/pinbot.webp',
      inviteLink:
        'https://discord.com/api/oauth2/authorize?client_id=830875816300380210&permissions=2684873936&scope=bot%20applications.commands',
      description: `A Discord Bot for pinning messages in a dedicated channel instead of Discord's pin list.`,
      isConfigurable: false,
      gitHubLink: 'https://github.com/rarDevelopment/pin-bot-dotnet',
    } as BotDefinition,
    {
      name: 'Fantasy Critic Bot',
      imageUrl: 'assets/bots/fantasycriticbot.webp',
      inviteLink: 'https://www.fantasycritic.games/discord-bot',
      description: `A Discord Bot for keeping up with your Fantasy Critic League. Developed in collaboration with Steve Fallon (the creator of Fantasy Critic).`,
      isConfigurable: false,
      gitHubLink: 'https://github.com/SteveF92/FantasyCritic',
    } as BotDefinition,
    {
      name: 'PokémonBot',
      imageUrl: 'assets/bots/pokemonbot2.webp',
      inviteLink:
        'https://discord.com/api/oauth2/authorize?client_id=798376639578112001&permissions=515136&scope=bot%20applications.commands',
      description:
        'A Discord Bot for quickly searching basic Pokémon information and Pokémon TCG card images.',
      isConfigurable: false,
      gitHubLink: 'https://github.com/rarDevelopment/pokemon-bot-dotnet',
    } as BotDefinition,
    {
      name: 'ChefBot',
      imageUrl: 'assets/bots/chefbot.webp',
      inviteLink:
        'https://discord.com/api/oauth2/authorize?client_id=847737219125084180&permissions=414464678976&scope=bot%20applications.commands',
      description:
        'A fun Discord Bot for ordering food (Disclaimer: does not actually serve food).',
      isConfigurable: false,
      gitHubLink: 'https://github.com/rarDevelopment/chef-bot-dotnet',
    } as BotDefinition,
    {
      name: 'Theodore (ThreadBot)',
      imageUrl: 'assets/bots/threadbot.webp',
      inviteLink:
        'https://discord.com/api/oauth2/authorize?client_id=950921256314740766&permissions=534723914832&scope=bot%20applications.commands',
      description:
        'A Discord Bot for displaying the active threads in a Discord server in a designated channel.',
      isConfigurable: false,
      gitHubLink: 'https://github.com/rarDevelopment/thread-bot-dotnet',
    } as BotDefinition,
  ];

  ngOnInit(): void {
    this.isLoading = true;
    const accessToken = this.getLoginToken();
    if (accessToken) {
      this.discordService
        .getDiscordUser(accessToken!)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: (discordUser: any) => {
            if (!discordUser) {
              this.logOut();
            }
          },
          error: (error: any) => {
            console.error(error);
            this.logOut();
          },
        });
    }
  }
  showMessageIfNotLoggedIn(requiresLogin: boolean) {
    if (requiresLogin && !this.isLoggedIn()) {
      this.showSnackBar('You must be logged in with Discord to access the bot settings.', true);
    }
  }
}

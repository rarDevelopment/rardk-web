import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { GuildConfiguration } from 'src/app/components/bots/models/replybot/guild-configuration';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';

@Component({
  selector: 'app-guild-configuration-modal',
  templateUrl: './guild-configuration-modal.component.html',
  styleUrls: ['./guild-configuration-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipDirective],
})
export class GuildConfigurationModalComponent implements OnChanges {
  @Input() guildConfiguration!: GuildConfiguration;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<GuildConfiguration>();

  // Use a local copy for editing to avoid direct modification of the input object
  // This allows for "cancel" functionality without affecting the parent's state until save.
  _guildConfiguration: GuildConfiguration = new GuildConfiguration();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['guildConfiguration'] && this.guildConfiguration) {
      // Create a deep copy for editing
      this._guildConfiguration = JSON.parse(JSON.stringify(this.guildConfiguration));
    }
  }

  saveConfiguration(): void {
    this.save.emit(this._guildConfiguration);
  }

  closeModal(): void {
    this.close.emit();
  }

  isNumericString(value: string): boolean {
    return !!value && /^\d+$/.test(value);
  }
}

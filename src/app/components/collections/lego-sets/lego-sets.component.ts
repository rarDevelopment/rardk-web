import { Component } from '@angular/core';
import { take } from 'rxjs';
import { LegoSet } from 'src/app/components/collections/lego-sets/models/lego-set';
import { LegoSetsService } from './lego-sets.service';
import { CheckOrXComponent } from '../../shared/check-or-x/check-or-x.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';
import { ModalImage, ModalImageItem } from 'src/app/models/modal-image';
import { LegoSetDisplay } from './models/lego-set-display';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-lego-sets',
  templateUrl: './lego-sets.component.html',
  styleUrls: ['./lego-sets.component.scss'],
  standalone: true,
  imports: [
    PageTitleComponent,
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatOptionModule,
    MatRadioModule,
    CheckOrXComponent,
    NgIf,
    LoadingIndicatorComponent,
    ModalComponent,
  ],
})
export class LegoSetsComponent {
  public ownedSets: LegoSetDisplay[];
  public wantedSets: LegoSetDisplay[];
  public filteredOwnedSets: LegoSetDisplay[];
  public displayedOwnedColumns: string[] = ['name', 'series', 'built'];
  public displayedWantedColumns: string[] = ['name', 'series', 'owned'];
  public panelOpenState: boolean = false;
  public filterOptionBuilt: string = 'BUILT';
  public filterOptionUnbuilt: string = 'UNBUILT';
  public filterOptionAll: string = 'ALL';
  public filterOptionSelected: string = this.filterOptionAll;
  public ownedSeriesOptions: string[];
  public filterOptionNoSeries = 'NONE';
  public seriesOptionSelected: string = this.filterOptionNoSeries;
  public modalVisibilitiesWantedSets: boolean[] = [];
  public modalVisibilitiesOwnedSets: boolean[] = [];
  public isLoading: boolean = false;

  constructor(private legoSetsService: LegoSetsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.legoSetsService
      .getLegoSets()
      .pipe(take(1))
      .subscribe((sets: LegoSet[]) => {
        this.ownedSets = this.filteredOwnedSets = sets
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter((l) => l.owned)
          .map((s) => this.buildLegoSetDisplay(s));
        this.wantedSets = sets
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter((l) => !l.owned)
          .map((s) => this.buildLegoSetDisplay(s));

        this.ownedSeriesOptions = Array.from(new Set(this.ownedSets.map((s) => s.series))).sort();

        this.isLoading = false;
      });
  }

  private buildLegoSetDisplay(s: LegoSet): LegoSetDisplay {
    return {
      name: s.name,
      owned: s.owned,
      built: s.built,
      series: s.series,
      url: s.url,
      imageUrl: s.imageUrl,
      previewUrl: s.previewUrl,
      modalImage: {
        url: s.url,
        title: s.name,
        images: [{ url: s.imageUrl, description: s.name } as ModalImageItem],
        sourceSiteName: 'LEGO.ca',
      } as ModalImage,
      isModalVisible: false,
    } as LegoSetDisplay;
  }

  toggleModal(set: LegoSetDisplay, isVisible: boolean) {
    set.isModalVisible = isVisible;
  }

  public applyFilters() {
    this.filteredOwnedSets = this.ownedSets.filter((t) => {
      if (this.filterOptionSelected === this.filterOptionBuilt) {
        return t.built;
      } else if (this.filterOptionSelected === this.filterOptionUnbuilt) {
        return !t.built;
      }
      return t;
    });
    this.filteredOwnedSets = this.filteredOwnedSets.filter((t) => {
      if (this.seriesOptionSelected !== this.filterOptionNoSeries) {
        return t.series === this.seriesOptionSelected;
      }
      return t;
    });
  }
}

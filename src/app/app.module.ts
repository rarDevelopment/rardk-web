import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MarkdownModule } from 'ngx-markdown';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavbarComponent,
    TooltipDirective,
    MarkdownModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, disableClose: true },
    },
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './menus/add/add.component';
import { DinnerComponent } from './menus/dinner/dinner.component';
import { LunchComponent } from './menus/lunch/lunch.component';
import { ShowComponent } from './menus/show/show.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    DinnerComponent,
    LunchComponent,
    AddComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}

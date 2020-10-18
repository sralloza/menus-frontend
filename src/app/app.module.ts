import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenusComponent } from './menus/menus.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DinnerComponent } from './menus/dinner/dinner.component';
import { LunchComponent } from './menus/lunch/lunch.component';


@NgModule({
  declarations: [AppComponent, MenusComponent, DinnerComponent, LunchComponent],
  imports: [AppRoutingModule, BrowserModule, CommonModule, NgbModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

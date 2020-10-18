import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenusComponent } from './menus/menus.component';


@NgModule({
  declarations: [AppComponent, MenusComponent],
  imports: [AppRoutingModule, BrowserModule, CommonModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

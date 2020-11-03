import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
  menus = [];
  readonly defaultUrl = 'https://www.residenciasantiago.es/menus-1/';
  dateViewed = new Date();
  loaded = false;
  days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  constructor(private api: ApiService) {}

  get dayTitleLink() {
    return this.menu ? this.menu.url : this.defaultUrl;
  }

  get dayTitle() {
    if (this.menu) return this.menu.title;

    var day = this.days[this.dateViewed.getDay()];
    return day + ' ' + this.dateViewed.getDate();
  }

  get menu() {
    let menu = this.menus.find(
      (menu) => menu['id'] == this.dateViewed.toISOString().slice(0, 10)
    );
    if (menu == undefined) return null;
    return menu;
  }

  get lunch() {
    if (this.menu) return this.menu.lunch;
    return null;
  }

  get dinner() {
    if (this.menu) return this.menu.dinner;
    return null;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    let response = this.api.getMenus();
    response.then(
      (menus) => {
        for (let old_menu of menus) {
          let new_menu = {
            id: old_menu.id,
            lunch: { p1: old_menu.lunch1, p2: old_menu.lunch2 },
            dinner: { p1: old_menu.dinner1, p2: old_menu.dinner2 },
            url: old_menu.url,
            title: old_menu.title,
          };
          this.menus.push(new_menu);
        }
        this.findSelectedDay();
      },
      (error) => {
        console.error('error:');
        console.error(error);
      }
    );
  }

  findSelectedDay() {
    this.loaded = true;

    console.log('Updating interface using day=' + this.dateViewed);
    console.log(this.menu);
  }

  tomorrow() {
    this.dateViewed.setDate(this.dateViewed.getDate() + 1);
    this.findSelectedDay();
    console.log(`Changed day to tomorrow (${this.dateViewed})`);
  }

  yesterday() {
    this.dateViewed.setDate(this.dateViewed.getDate() - 1);
    this.findSelectedDay();
    console.log(`Changed day to yesterday (${this.dateViewed})`);
  }

  }
}

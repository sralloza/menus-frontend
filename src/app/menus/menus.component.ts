import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  get dayTitleLink() {
    return this.menu ? this.menu.url : this.defaultUrl;
  }

  get dayTitle() {
    if (this.menu) return this.menu.day;

    var day = this.days[this.dateViewed.getDay()];
    return day + ' ' + this.dateViewed.getDate();
  }

  get todayMenuID() {
    var year = this.dateViewed.getFullYear();
    var month = this.dateViewed.getMonth() + 1;
    var day = this.dateViewed.getDate();

    return day + month * 100 + year * 10000;
  }

  get menu() {
    let menu = this.menus.find((menu) => menu['id'] == this.todayMenuID);
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

  loadMenusFromLocalStorage() {
    let menus = JSON.parse(localStorage.getItem('menus'));
    if (menus == undefined) {
      console.log('No menus found in local storage');
      return;
    }
    this.menus = menus;
  }

  storeMenusInLocalStorage() {
    localStorage.setItem('menus', JSON.stringify(this.menus));
  }

  fetchData() {
    this.loadMenusFromLocalStorage();

    if (this.menu) {
      console.log('Data found in local storage, skipping api call');
      this.storeMenusInLocalStorage();
      return this.findSelectedDay();
    }

    var url = 'https://resi.sralloza.es/api/menus';
    console.log('sending api call');

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.menus = data;
        this.storeMenusInLocalStorage();
        this.findSelectedDay();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findSelectedDay() {
    this.loaded = true;

    console.log('Updating interface using day=' + this.todayMenuID);
    console.log(this.menu);
  }

  tomorrow() {
    this.dateViewed.setDate(this.dateViewed.getDate() + 1);
    this.findSelectedDay();
    console.log(`Changed day to tomorrow (${this.todayMenuID})`);
  }

  yesterday() {
    this.dateViewed.setDate(this.dateViewed.getDate() - 1);
    this.findSelectedDay();
    console.log(`Changed day to yesterday (${this.todayMenuID})`);
  }
}

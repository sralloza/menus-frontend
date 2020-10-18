import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getMenus(): Promise<any> {
    let menus = this.getMenusFromLocalStorage();

    var url = 'https://resi.sralloza.es/api/menus';

    return new Promise((resolve, reject) => {
      if (menus != null) {
        console.log('menus found in local storage');
        resolve(menus);
        return;
      }

      console.log('sending api call');
      let response = this.http.get(url);
      response.subscribe(
        (menus) => {
          this.storeMenusInLocalStorage(menus);
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getMenusFromLocalStorage() {
    let menus = JSON.parse(localStorage.getItem('menus'));
    if (menus == undefined) {
      console.log('No menus found in local storage');
      return null;
    }
    return menus;
  }

  storeMenusInLocalStorage(menus) {
    localStorage.setItem('menus', JSON.stringify(menus));
  }
}

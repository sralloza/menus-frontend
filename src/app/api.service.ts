import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getMenus(): Promise<any> {
    let menus = this.getMenusFromLocalStorage();

    var url = 'http://localhost/menus';

    return new Promise((resolve, reject) => {
      if (menus != null) {
        console.log('menus found in local storage');
        resolve(menus);
        return;
      }

      console.log('sending api call');
      this.http.get(url).subscribe(
        (response) => {
          this.storeMenusInLocalStorage(response);
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

  addMenu(menu): Promise<any> {
    var url = 'http://localhost/menus';

    // var form_data = new FormData();
    // form_data.append('token', '202010182235');
    // form_data.append('day', menu.day);
    // form_data.append('month', menu.month);
    // form_data.append('year', menu.year);
    // form_data.append('lunch-1', menu.lunch.p1);
    // form_data.append('lunch-2', menu.lunch.p2);
    // form_data.append('dinner-1', menu.dinner.p1);
    // form_data.append('dinner-2', menu.dinner.p2);

    return new Promise((resolve, reject) => {
      console.log('sending api call');
      let response = this.http.post(url, menu);
      response.subscribe(
        (response) => {
          console.log(response);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost/menus';
  constructor(private http: HttpClient) {}

  getMenus(): Promise<any> {
    let menus = this.getMenusFromLocalStorage();

    return new Promise((resolve, reject) => {
      if (menus != null) {
        console.log('menus found in local storage');
        resolve(menus);
        return;
      }

      console.log('sending api call');
      this.http.get(this.url).subscribe(
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
    return new Promise((resolve, reject) => {
      console.log('sending api call');
      let response = this.http.post(this.url, menu);
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

  removeMenu(date: Date, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: date,
          token_id: token,
        },
      };

      let response = this.http.delete(this.url, options);
      response.subscribe(
        (response) => {
          console.log(response);
          resolve();
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  updateMenu(menu) {}
}

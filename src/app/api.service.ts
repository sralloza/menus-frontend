import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // url = 'http://localhost/menus';
  url = 'https://menus-test.sralloza.es/api/menus';

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
    return null
    let menus = JSON.parse(localStorage.getItem('menus'));
    let now = new Date('2020-12-12');
    let menu = menus.find(
      (menu) => menu['id'] == now.toISOString().slice(0, 10)
    );

    if (menu == undefined) {
      console.log('forcing update of menus');
    }

    if (menus == undefined || menu == undefined) {
      console.log('No menus found in local storage');
      return null;
    }
    return menus;
  }

  storeMenusInLocalStorage(menus) {
    localStorage.setItem('menus', JSON.stringify(menus));
  }

  addMenu(
    date: Date,
    lunch1: string,
    lunch2: string,
    dinner1: string,
    dinner2: string,
    token: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let menu = {
        id: date,
        lunch1: lunch1,
        lunch2: lunch2,
        dinner1: dinner1,
        dinner2: dinner2,
        token_id: token,
      };
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

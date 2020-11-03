import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  date: null;
  lunch1: null;
  lunch2: null;
  dinner1: null;
  dinner2: null;
  token: null;

  constructor(private api: ApiService, private alerts: AlertService) {}

  ngOnInit(): void {}

  reset() {
    this.date = null;
    this.lunch1 = null;
    this.lunch2 = null;
    this.dinner1 = null;
    this.dinner2 = null;
    this.token = null;
  }

  addMenu() {
    var menu = {
      id: this.date,
      lunch1: this.lunch1,
      lunch2: this.lunch2,
      dinner1: this.dinner1,
      dinner2: this.dinner2,
      token_id: this.token,
    };
    console.log(menu);
    this.api
      .addMenu(menu)
      .then((response) => {
        console.log(response);
        this.alerts.info('Menu created successfully');
      })
      .catch((error) => {
        console.log(error);
        this.alerts.error(error.error.detail);
      });
  }
}

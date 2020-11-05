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
    if (!this.date) {
      this.alerts.error('Must set date');
      return;
    }
    if (!this.token) {
      this.alerts.error('Must set token');
      return;
    }

    this.api
      .addMenu(menu)
      .then((response) => {
        console.log(response);
        this.alerts.clear();
        this.alerts.success('Menu created successfully');
        this.reset();
      })
      .catch((error) => {
        this.alerts.clear();
        this.alerts.error(error.error.detail);
      });
  }
}

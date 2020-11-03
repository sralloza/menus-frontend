import { Component, OnInit } from '@angular/core';
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

  errorMsg = 'Unkown error';
  successFlag = false;
  errorFlag = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  reset() {
    this.date = null;
    this.lunch1 = null;
    this.lunch2 = null;
    this.dinner1 = null;
    this.dinner2 = null;
    this.token = null;
  }
  log() {
    console.log(this.successFlag);
    console.log(this.errorFlag);
  }

  addMenu() {
    this.successFlag = false;
    this.errorFlag = false;

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
        this.successFlag = true;
      })
      .catch((error) => {
        console.log(error);
        this.errorFlag = true;
        this.errorMsg = error.error.detail;
      });
  }
}

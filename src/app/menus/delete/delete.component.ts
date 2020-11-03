import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  date: null;
  token: null;
  constructor(private api: ApiService, private alerts: AlertService) {}

  ngOnInit(): void {}

  reset() {
    this.date = null;
    this.token = null;
  }

  deleteMenu() {
    this.api.removeMenu(this.date, this.token).then(
      (response) => {
        this.alerts.success('Menu removed');
        this.reset();
      },
      (error) => {
        console.log(error.error);
        this.alerts.error(error.error.detail);
      }
    );
  }
}

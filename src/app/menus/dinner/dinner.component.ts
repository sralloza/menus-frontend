import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dinner',
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.css'],
})
export class DinnerComponent implements OnInit {
  @Input() meal: { p1: string; p2: string };

  constructor() {}

  ngOnInit(): void {}
}

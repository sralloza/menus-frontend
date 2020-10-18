import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css'],
})
export class LunchComponent implements OnInit {
  @Input() meal: { p1: string; p2: string };

  constructor() {}

  ngOnInit(): void {}
}

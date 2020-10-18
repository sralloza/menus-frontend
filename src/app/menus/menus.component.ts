import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
  menus = [];
  menu = null;
  dateViewed = new Date();
  loaded = false;
  defaultUrl = 'https://www.residenciasantiago.es/menus-1/';
  days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  // CLICK DETECTION
  xDown = null;
  yDown = null;
  lastTouch = new Date();

  width = 0;
  height = 0;
  // If true, a middle click will auto-click in the middle button (redirect to /menus)
  enableMiddleClick = false;

  constructor() {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    console.log(event.target);
    this.handleClick(event);
  }

  ngOnInit(): void {
    this.updateWindowsDimensions();
    this.fetchData();
  }

  get(name) {
    if (name == '') return false;
    let queryDict = {};
    queryDict[name] = false;
    location.search
      .substr(1)
      .split('&')
      .forEach((item) => {
        queryDict[item.split('=')[0]] = true;
      });

    return queryDict[name];
  }

  fetchData() {
    var forceUpdate = this.get('update');
    console.log('fetch with update=' + forceUpdate);

    var url = 'https://menus.sralloza.es/api/menus';
    if (forceUpdate) url += '?update';

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.menus = data;
        this.findSelectedDay();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findSelectedDay() {
    var updateRequest = this.get('update');
    var ask = this.printDate(this.dateViewed);
    this.menu = this.menus.find((menu) => menu['id'] == ask);
    this.loaded = true;

    var nArguments = location.search.substr(1).split('&').length;
    var update = false;

    if (nArguments) {
      if (updateRequest)
        if (update) console.log('Database update request accepted');
        else console.log('Database update request denied');
    }

    console.log('Updating interface using day=' + ask);
    console.log(this.menu);
  }

  printDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    month = '' + month;

    if (day < 10) {
      day = '0' + day;
    }
    day = '' + day;

    return parseInt(year + month + day);
  }

  getDayTitle() {
    var day = this.days[this.dateViewed.getDay()];
    return day + ' ' + this.dateViewed.getDate();
  }

  tomorrow() {
    this.dateViewed.setDate(this.dateViewed.getDate() + 1);
    this.findSelectedDay();
    console.log(
      'Changed day to tomorrow (' + this.printDate(this.dateViewed) + ')'
    );
  }

  yesterday() {
    this.dateViewed.setDate(this.dateViewed.getDate() - 1);
    this.findSelectedDay();
    console.log(
      'Changed day to yesterday (' + this.printDate(this.dateViewed) + ')'
    );
  }

  // Calculate width
  updateWindowsDimensions() {
    let newWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    let newHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    if (newWidth == this.width && newHeight == this.height) return;

    this.width = newWidth;
    this.height = newHeight;

    console.log('Calculated width: ' + this.width);
    console.log('Calculated height: ' + this.height);
  }

  // Events listeners
  // document.addEventListener('touchstart', handleTouchStart, false);
  // document.addEventListener("click", handleClick);
  // document.onkeydown = detectArrows;
  // document.onkeypress = detectKey;

  // Handlers
  handleClick(e) {
    let timedelta = new Date().getTime() - this.lastTouch.getTime();
    console.log(timedelta);
    if (timedelta < 750) return;

    this.findSelectedDay();
    let cursorX = (e.pageX * 100) / this.width;
    let cursorY = (e.pageY * 100) / this.height;

    if (cursorX == 0 || cursorY == 0) return;

    console.log(
      'Click detected on PC: (' +
        cursorX.toFixed(2) +
        '%, ' +
        cursorY.toFixed(2) +
        '%)'
    );
    return this.clickDetected(cursorX, cursorY);
  }

  getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  handleTouchStart(evt) {
    this.updateWindowsDimensions();
    const firstTouch = this.getTouches(evt)[0];
    let cursorX = (firstTouch.clientX * 100) / this.width;
    let cursorY = (firstTouch.clientY * 100) / this.height;

    console.log(
      'Detected Touch: (' +
        cursorX.toFixed(2) +
        '%, ' +
        cursorY.toFixed(2) +
        '%)'
    );
    this.lastTouch = new Date();
    return this.clickDetected(cursorX, cursorY);
  }

  clickDetected(cursorXPercentage, cursorYPercentage) {
    let jumboUp =
      (document.getElementById('main-jumbotron').getBoundingClientRect()[
        'top'
      ] *
        100) /
      this.height;
    let prevLeft =
      (document.getElementById('previous').getBoundingClientRect()['left'] *
        100) /
      this.width;
    let prevWidth =
      (document.getElementById('previous').getBoundingClientRect()['width'] *
        100) /
      this.width;
    let allWidth =
      (document.getElementById('all').getBoundingClientRect()['width'] * 100) /
      this.width;

    let y = jumboUp;
    let x = (50 - prevLeft - prevWidth - allWidth / 2) / 2;
    let centerDiff = allWidth / 2 + x;

    let rightMargin = 50 + centerDiff;
    let leftMargin = 50 - centerDiff;

    if (cursorYPercentage < y) {
      console.log('Cancelling click (click above jumbotron)');
      return;
    }

    if (cursorXPercentage > rightMargin) return this.clickNext();
    if (cursorXPercentage < leftMargin) return this.clickPrevious();

    if (this.enableMiddleClick) return this.clickAll();
  }

  clickPrevious() {
    console.log('Calling yesterday()');
    this.yesterday();
  }

  clickNext() {
    console.log('Calling tomorrow()');
    this.tomorrow();
  }

  clickAll() {
    console.log('Autoclicking middle button (all)');
    document.getElementById('all').click();
  }

  // Keys

  detectArrows(e) {
    // Detects left and right arrows
    switch (e.keyCode) {
      case 37:
        // Left arrow
        console.log('Left arrow pressed');
        this.clickPrevious();
        break;
      case 39:
        // Right arrow
        console.log('Right arrow pressed');
        this.clickNext();
        break;
    }
  }

  detectKey(e) {
    // Detects letters J, K, H and T
    switch (e.keyCode) {
      case 106:
      case 74:
        // Letter J
        console.log('Letter J pressed');
        this.clickPrevious();
        break;
      case 107:
      case 75:
        // Letter K
        console.log('Letter K pressed');
        this.clickNext();
        break;
      case 104:
      case 72:
        // Letter H
        console.log('Letter T pressed');
        this.jumpToToday();
        break;
      case 116:
      case 84:
        // Letter T
        console.log('Letter T pressed');
        this.jumpToToday();
        break;
    }
  }

  jumpToToday() {
    let today = new Date();
    this.dateViewed = today;
    this.findSelectedDay();
  }
}

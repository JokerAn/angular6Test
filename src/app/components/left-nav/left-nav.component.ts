import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  openMap: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
  };
  constructor() { }

  ngOnInit() {
  }
  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }
  openHandlers() { 
    for (const key in this.openMap) {
      this.openMap[key] = false; 
    }
  }
}

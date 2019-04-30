import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) { }

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
  gotopage(pageUrl: any, canshu = {}) { 
    this.router.navigate([pageUrl], {
      // relativeTo: this.routerInfo,//基于当前路由跳转
      queryParams: canshu
    })
  }
}

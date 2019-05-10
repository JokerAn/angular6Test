import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  prevData: any;
  constructor(private routeInfo: ActivatedRoute) { 
    this.routeInfo.queryParams.subscribe((res) => {//这种方式不管是否是自己跳转自己 都会刷新数据
      this.prevData = res.canshu;
      console.log(res)
    })
  }

  ngOnInit() {
  }

}

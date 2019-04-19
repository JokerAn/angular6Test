import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoutChangPassword = false;
  constructor() { }

  ngOnInit() {
  }
  logoutChangPasswordShow(res: any) {
    this.logoutChangPassword = res;
  }
  changePassword() {
    console.log('你点击了修改密码');
    this.logoutChangPassword = false;
  }
  logout() {
    console.log('你点击了退出');
    this.logoutChangPassword = false;
  }
  getUserInfo(searchKey:any) { 
    console.log('你要搜索的是 ' + searchKey);
  };
}

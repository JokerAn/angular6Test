import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmmitAlertService } from 'src/app/services/emmit-alert.service';
import { AnDataService } from 'src/app/services/an-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoutChangPassword = false;
  searchKey = '';
  userName = localStorage.userName||'测试用户';
  constructor(public router: Router, public emmitAlert: EmmitAlertService, public anData: AnDataService) {
    if (this.emmitAlert.$on) {
      this.emmitAlert.$on.subscribe((emmitData: any) => {
        console.group('header.component.ts页面接收到的emmitAlert--' + emmitData.id);

        console.log('我是header.component.ts页面 我接受到了 ' + JSON.stringify(emmitData) + ' 我可以做一些操作了包括关闭弹框');
        switch (emmitData.id) {
          case 'allUserAlert'://关闭公共弹框
            console.log('下面这一行是关于公共弹框的广播数据');
            console.log(emmitData);
            this.anData.allUserAlert.popShow = false;
            break
          case 'login_login'://关闭公共弹框
            console.log(emmitData);
            this.userName = emmitData.data.name
            break
          default:
            console.log('接收到广播 但是没有对应的操作 走了默认')
        }
        console.groupEnd();

      })
    }
   }

  ngOnInit() {
    console.log('我是headerComponent');
  }
  gotoHome() { 
    this.router.navigate(['/'])
  }
  logoutChangPasswordShow(res: any) {
    this.logoutChangPassword = res;
  }
  changePassword() {
    console.log('你点击了修改密码');
    this.logoutChangPassword = false;
    this.router.navigate(['/changPwd'])
  }
  logout() {
    console.log('你点击了退出');
    this.logoutChangPassword = false;
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
    
  }
  getUserInfo(searchKey:any) { 
    console.log('this.searchKey= ' + searchKey);
    console.log('你要搜索的是 ' + searchKey);
  };
}

import { Component } from '@angular/core';
import { apiUrlsService } from "./services/api-urls.service";
import { AnDataService } from './services/an-data.service';
import { EmmitAlertService } from './services/emmit-alert.service';
import * as mongoose from 'mongoose';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular7';
  childZorrorBtnMsg = '我还没接受到子组件传递的值';
  searchKey = '';

  constructor(public apiUrls: apiUrlsService, public anData: AnDataService, public emmitAlert: EmmitAlertService){
    if (this.emmitAlert.$on) {
      this.emmitAlert.$on.subscribe((emmitData: any) => {
        console.group('我是app.component.ts页面接收到的emmitAlert--' + emmitData.id);
        console.log('我是app.component.ts页面 我接受到了 ' + JSON.stringify(emmitData) + ' 我可以做一些操作了包括关闭弹框');
        switch (emmitData.id) {
          case 'allUserAlert'://关闭公共弹框
            console.log('下面这一行是关于公共弹框的广播数据');
            console.log(emmitData);
            this.anData.allUserAlert.popShow = false;
            break
          case 'emmitTest':
            console.log('下面这一行是关于公共弹框的广播数据');
            console.log(emmitData);
            break
          case 'emmitTest03':
            console.log('下面这一行是关于公共弹框的广播数据');
            console.log(emmitData);
            this.childZorrorBtnMsg = emmitData;
            this.anData.allUserAlert.popShow = false;
            break
          case 'emmitTest03Pop':
            if (emmitData.btnClick){
              console.log('你点击了确定按钮');
          }else{
              console.log('你点击了取消按钮');
          }
            
            this.anData.allUserAlert.popShow = false;
            break
          default:
            console.log('接收到广播 但是没有对应的操作 走了默认')
        }
        console.groupEnd();
      })
    }
  }
  ngOnInit(): void {
    
  }


  

  
}

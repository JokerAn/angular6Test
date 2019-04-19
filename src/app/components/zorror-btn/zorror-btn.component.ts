import { Component, OnInit } from '@angular/core';
import { AnHttpService } from 'src/app/services/an-http.service';
import { Observable } from 'rxjs';
import { apiUrlsService } from 'src/app/services/api-urls.service';
import { EmmitAlertService } from 'src/app/services/emmit-alert.service';
import { AnDataService } from 'src/app/services/an-data.service';

@Component({
  selector: 'app-zorror-btn',
  templateUrl: './zorror-btn.component.html',
  styleUrls: ['./zorror-btn.component.scss']
})
export class ZorrorBtnComponent implements OnInit {
  public Observable = new Observable();
  public userName: String = 'renee.chan@renee-arts.com';
  public userPassword: String = '123456';
  constructor(private http:AnHttpService,private apiUrls:apiUrlsService,public emmitAlert:EmmitAlertService,
    public anData:AnDataService) { }

  ngOnInit() {
    if (this.emmitAlert.$on) {
      this.emmitAlert.$on.subscribe((emmitData: any) => {
        console.group('我是zorror-btn.component.ts页面接收到的emmitAlert');
        console.log('我是zorror-btn.component.ts页面 我接受到了 ' + JSON.stringify(emmitData) + ' 我可以做一些操作了包括关闭弹框');
        switch (emmitData.id) {
          case 'allUserAlert'://关闭公共弹框
            console.log('下面这一行是关于公共弹框的广播数据');
            console.log(emmitData);
            break
          case 'emmitTest':
            console.log('下面这一行是关于公共弹框的广播数据');
            console.log(emmitData);
            break
          default:
            console.log('接收到广播 但是没有对应的操作 走了默认');
        }
        console.groupEnd();
      })
    }
  }
  login() {
    let data = {
      // hiddeLoading:true,
      username: this.userName,
      password: this.userPassword
    };

    this.http.post(this.apiUrls.login, data).subscribe(
      (request) => {
        // console.log(request );
        localStorage.user_token = request.tokenType + ' ' + request.token;
        sessionStorage.changeIE = 'sss';
        sessionStorage.emmitNames = '[]';//广播事件名称
      },
      (err) => {
        console.log(err);
      }
    );
  }
  emmitTest(){
    this.emmitAlert.send({id:'emmitTest',data:{name:'我是传过去的数据'}});
    this.anData.allUserAlertShow();
  }
  emmitTest02(){
    this.emmitAlert.send({data:{name:'我是传过去的数据02'}})
  }
  emmitTest03(){
    this.emmitAlert.send({ id: 'emmitTest03', data: { name: '我是传过去的数据03' } });
    this.anData.allUserAlertShow(true,{
      id: 'emmitTest03Pop',
      popShow: true,
      title: '告警001',
      msg: '确定删除选中的数据？001',
      btnOk: '确定001',
      btnClose: '取消001',
      style: { width: '500px' }
    });
  }
}

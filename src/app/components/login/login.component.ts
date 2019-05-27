import { Component, OnInit } from '@angular/core';
import { AnHttpService } from 'src/app/services/an-http.service';
import { AnDataService } from 'src/app/services/an-data.service';
import { Router } from '@angular/router';
import { EmmitAlertService } from 'src/app/services/emmit-alert.service';
import { apiUrlsService } from 'src/app/services/api-urls.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = '安顺利';
  userPwd = '123456';
  loading = false;
  constructor(private anHtpp: AnHttpService, private anData: AnDataService, private router: Router,
    private emmitAlert: EmmitAlertService, public apiUrls: apiUrlsService) { }

  ngOnInit() {
    if (localStorage.userName) { 
      this.router.navigate(['/home'], {
        // relativeTo: this.routerInfo,//基于当前路由跳转
        queryParams: {
          'canshu': "娃哈哈"
        }
      })
    }
  }
  login() {
    this.loading = true;
    if (this.userName && this.userPwd) {
      console.log({ name: this.userName, password: this.userPwd });
      this.anHtpp.get(this.apiUrls.login+'?name='+this.userName+'&password='+ this.userPwd).subscribe(
        (result: any) => {
          this.loading = false;
          console.log(result);
          if (result.msg == '登录成功') { 
            localStorage.userName = result.data[0].name;
            localStorage.userId = result.data[0]['_id'];
            this.emmitAlert.send({ id: 'login_login', data: result.data[0] });
            this.router.navigate(['/home'], {
              // relativeTo: this.routerInfo,//基于当前路由跳转
              queryParams: {
                'canshu': "娃哈哈"
              }
            })
          }
        }, (err: any) => {
          this.loading = false;
          console.log(err);
        }
      )
    } else { 
      this.anData.showMsg('请填写账号或密码');
    }

  }

}

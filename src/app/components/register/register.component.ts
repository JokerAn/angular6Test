import { Component, OnInit } from '@angular/core';
import { AnDataService } from 'src/app/services/an-data.service';
import { AnHttpService } from 'src/app/services/an-http.service';
import { Router } from '@angular/router';
import { apiUrlsService } from 'src/app/services/api-urls.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  checked = true;
  userName ='123456';
  userPwd ='123456';
  userPwd2 ='123456';
  userPhone ='18511111111';
  loading: false;
  JokerAnXiYiShow= false;
  constructor(private anData: AnDataService, private anHttp: AnHttpService, private router: Router,
  private apiUrls:apiUrlsService) { }

  ngOnInit() {
  }
  scrollFunc(e) { 
    let handle = function (e) { 
      let evt = e || window.event; 
      if (evt.preventDefault) {
        // Firefox  
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        // IE  
        evt.cancelBubble = true;
        evt.returnValue = false;
      }
      return false;
    }
    e.target.addEventListener('mousewheel', handle)
    e.target.addEventListener('DOMMouseScroll', handle)
  }
  register() { 
    this.userName = this.userName.replace(/(^\s*)|(\s*$)/g, "");
    let canshu = {
      name: this.userName,
      password: this.userPwd,
      phone: this.userPhone,
      '是否同意协议': this.checked
    }
    if (this.userName == '') { 
      this.anData.showMsg('请填写姓名', 2000, 'warning');
      return
    }
    if (this.userName.length > 21) { 
      this.anData.showMsg('姓名长度应该小于等于20', 2000, 'warning');
      return
    }
    if (this.userPwd == '' || this.userPwd.length < 6 || this.userPwd.length > 16) { 
      this.anData.showMsg('请填写大于等于6位小于等于15位的密码', 2000, 'warning');
      return
    }
    if (this.userPwd !== this.userPwd2) { 
      this.anData.showMsg('两次密码不一致', 2000, 'warning');
      return
    }
    if (!(/^1[34578]\d{9}$/.test(this.userPhone))) {
      this.anData.showMsg('请填正确的手机号', 2000, 'warning');
      return;
    } 
    console.log(canshu);
    this.anHttp.post(this.apiUrls.register, canshu, {}).subscribe((result:any) => { 
      this.anData.showMsg(result.msg, 2000, 'warning');
      if (result.msg == '注册成功') { 
        this.router.navigate(['/login'])
      }
    })    
  }
}

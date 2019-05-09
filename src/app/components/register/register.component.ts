import { Component, OnInit } from '@angular/core';
import { AnDataService } from 'src/app/services/an-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  checked = true;
  userName ='';
  userPwd ='';
  userPhone ='';
  loading: false;
  JokerAnXiYiShow= false;
  constructor(private anData: AnDataService) { }

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
      userName: this.userName,
      userPwd: this.userPwd,
      userPhone: this.userPhone,
      '是否同意协议': this.checked
    }
    if (this.userName == '') { 
      this.anData.showMsg('请填写姓名', 2000, 'warning');
      return
    }
    if (this.userPwd==''||this.userPwd.length<6) { 
      this.anData.showMsg('请填写大于5位的密码', 2000, 'warning');
      return
    }
    if (!(/^1[34578]\d{9}$/.test(this.userPhone))) {
      this.anData.showMsg('请填正确的手机号', 2000, 'warning');
      return;
    } 
    console.log(canshu);
  }
  JokerAnXiYiShowF() { 
    this.JokerAnXiYiShow = true;
  }
}

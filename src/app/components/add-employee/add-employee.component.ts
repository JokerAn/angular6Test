import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { AnHttpService } from 'src/app/services/an-http.service';
import { apiUrlsService } from 'src/app/services/api-urls.service';
import { AnDataService } from 'src/app/services/an-data.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  inputTimeStyle = {
    width: "350px"
  };
  employeeName = '';
  employeePhone = null;
  employeeBirthday: any = '';
  employeeSex = "1";
  employeeState = '';
  loading = false;
  avatarUrl: string;
  imgUrl = '/assets/images/user@2x.png';
  fd: any;
  constructor(private anhttp: AnHttpService, public apiUrls: apiUrlsService, public anData: AnDataService) { }

  ngOnInit() {
  }
  employeePhoneChange(event) {
    let currentValue = +event.key;
    let values = event.target.value;
    console.log(`刚刚输入的是 ${currentValue},现在的值是 ${values}`);
    if (isNaN(currentValue)) {
      this.employeePhone = values.slice(0, -1);
    }
  }
  addEmployeeAjax() {
    if (this.fd) {
      this.uploadFile(this.fd).then((result:any) => { 
            console.log({
              "用户名": this.employeeName,
              "电话": this.employeePhone,
              "生日": +this.employeeBirthday,
              "性别": this.employeeSex,
              "状态": this.employeeState,
              "头像地址": result.key
            });
            this.employeeName = '';
            this.employeePhone = '';
            this.employeeBirthday = '';
            this.employeeSex = "1";
            this.employeeState = '';
            this.fd = null;
            this.imgUrl = '/assets/images/user@2x.png';
          }).catch(err => { 
            console.log(err);
          });
    } else { 
      console.log({
        "用户名": this.employeeName,
        "电话": this.employeePhone,
        "生日": this.employeeBirthday - 0,
        "性别": this.employeeSex,
        "状态": this.employeeState,
        "头像地址": '未上传头像'
      });
    }
    
  }
  changeTouXiang(e) {
    this.fd = new FormData();
    var file = e.target.files[0];
    console.log(e);
    console.log(e.target);
    console.log(e.target.files);
    var me: any = this;
    console.log(file.type);
    const isJPG = file.type.startsWith('image/');
    if (!isJPG) {
      this.anData.showMsg('上传的不是图片!', 2500, 'error');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      this.anData.showMsg('图片太大，应该小于 1MB!', 2500, 'error');
      return;
    }
    this.fd.append('file', file);
    if (file) {
      let reader = new FileReader();
      reader.onload = function () {
        console.log(this);
        me.imgUrl = this.result;
      };
      reader.readAsDataURL(file);
    }
  }
  uploadFile(fd: any) {

    let me = this;
    return new Promise(function (reject, resolve) {
      me.anhttp.get('https://release.mtoliv.com/sps/api/v1/currency/picToken', {}).subscribe(
        (result: any) => {
          console.log(result);
          reject(result)
        })
    }).then((result: any) => {
      return new Promise((reject, resolve) => {
        this.anhttp.post(me.apiUrls.qiniuUpload + '/?token=' + result.token, fd, { 'Content-Type': undefined }).subscribe(
          (result: any) => {
            console.log(result);//{"key":"FqtFj4aT-MZyqEPggFb0Ff2nA4ww","hash":"FqtFj4aT-MZyqEPggFb0Ff2nA4ww","bucket":"images","fsize":1698}
            this.anData.showMsg('上传成功');
            this.imgUrl = me.apiUrls.qiniuImgUrls + '/' + result.key
            reject(result);
          })
      })
    })
  }
}

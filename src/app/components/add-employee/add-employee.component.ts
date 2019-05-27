import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { AnHttpService } from 'src/app/services/an-http.service';
import { apiUrlsService } from 'src/app/services/api-urls.service';
import { AnDataService } from 'src/app/services/an-data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employee_id: any;
  pageTitle: string='新增员工';
  inputTimeStyle = {
    width: "350px"
  };
  employeeName = '太上老君';
  employeePhone:any = 18544444141;
  employeeBirthday: any = '';
  employeeSex = "1";
  employeeState = '1';
  employeeJob = '炼丹';
  employeeRemark = '总是偷懒';
  loading = false;
  avatarUrl: string;
  imgUrl = '/assets/images/user@2x.png';
  fd: any;
  constructor(private anHttp: AnHttpService, public apiUrls: apiUrlsService, public anData: AnDataService,
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((result) => { 
      console.log(result);
      if (result.employee_id != undefined && result.employee_id != null && result.employee_id != '') {
        this.employee_id = result.employee_id;
        this.pageTitle = '员工详情' + this.employee_id;
        this.getInfoById(this.employee_id);
      }
    })
  }
  getInfoById(id:any) { 
    this.anHttp.get(this.apiUrls.getOneEmployee + '?id=' + id).subscribe((result: any) => { 
      console.log(result);


      this.employeeName = result.data[0].name||'';
      this.employeePhone = result.data[0].phone || '';
      this.employeeBirthday = result.data[0].birthday?new Date(result.data[0].birthday):new Date();
      this.employeeSex = result.data[0].sex || '';
      this.employeeState = result.data[0].state || '';
      this.employeeJob = result.data[0].job || '';
      this.employeeRemark = result.data[0].remark || '';
      this.imgUrl = this.apiUrls.baseImgUrl+result.data[0].userHeaderImg || '/assets/images/user@2x.png';
    })
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
    let me = this;
    let canshu:any = {
      customerId: localStorage.userId,
      bianma: '',
      name: this.employeeName,
      phone: this.employeePhone,
      age: this.anData.getAgeByBirthday(this.employeeBirthday),
      sex: this.employeeSex,
      job: this.employeeJob,
      state: this.employeeState,
      birthday: this.employeeBirthday - 0,
      userHeaderImg: '',
      remark: this.employeeRemark
    }
    console.log({
      "用户名": this.employeeName,
      "电话": this.employeePhone,
      "生日年月日": this.anData.annyr(this.employeeBirthday, '-'),
      "生日年月日时分秒": this.anData.annyrsfm(this.employeeBirthday, '-'),
      "生日年月日时分秒:00:00:00": this.anData.anNumberData(this.employeeBirthday, 0),
      "生日年月日时分秒:23:59:59": this.anData.anNumberData(this.employeeBirthday, 59),
      "年龄": this.anData.getAgeByBirthday(this.employeeBirthday),
      "性别": this.employeeSex,
      "状态": this.employeeState,
      "职务": this.employeeJob,
      "备注": this.employeeRemark,
      "头像地址": '未上传头像'
    });
    if (this.employee_id) { 
      canshu.id = this.employee_id;
    }
    if (this.fd) {
      new Promise((resolve, reject)=>{
        me.anHttp.post(this.apiUrls.ajaxUpload+'?hiddeLoading=false&&customerId=' + localStorage.userId, me.fd).subscribe((result: any) => {
          console.log(result);
          let linshi = result.newName.split('/');
          let newTimes = +new Date();
          me.imgUrl = this.apiUrls.baseImgUrl+ linshi[linshi.length - 1] + '?' + newTimes;
          // resolve(linshi[linshi.length - 1]);
          resolve(linshi);
        })
      }).then((result1:any)=>{
        console.log(result1);
        canshu.userHeaderImg = result1.splice(-1)[0];
        canshu.userHeaderImgPath = result1.join('/');
        this.anHttp.post(this.apiUrls.addOneEmployee, canshu).subscribe((result2: any) => {
          console.log(result2);
          this.anData.showMsg(result2.msg)
        })
      });
    } else { 
      this.anHttp.post(this.apiUrls.addOneEmployee, canshu).subscribe((result: any) => { 
        console.log(result);
        this.anData.showMsg(result.msg)
      })
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
    this.fd.append('userImg', file);
    if (file) {
      let reader = new FileReader();
      reader.onload = function () {
        console.log(this);
        me.imgUrl = this.result;
      };
      reader.readAsDataURL(file);
    }


  }
  changeBirthDay() { 
    console.log(this.employeeBirthday);
  }
  //更换头像
  justUpdateHeaderImg() { 
    let me = this;
    if (this.fd) { 
      me.anHttp.post(this.apiUrls.ajaxUpload + '?hiddeLoading=false&&customerId=' + localStorage.userId, me.fd).subscribe((result: any) => {
        console.log(result);
        let linshi = result.newName.split('/');
        let newTimes = +new Date();
        me.imgUrl = this.apiUrls.baseImgUrl + linshi[linshi.length - 1] + '?' + newTimes;
        console.log(linshi[linshi.length - 1]);
        // me.anHttp.post(this.apiUrls.updateOneEmployee, { '_id': this.employee_id, userHeaderImg: linshi[linshi.length - 1]}).subscribe((result: any) => {
        //   console.log(result);
        // })
      })
    }
  }
}

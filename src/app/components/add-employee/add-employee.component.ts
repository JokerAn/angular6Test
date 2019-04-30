import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
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
  employeePhone = '';
  employeeBirthday:any = '';
  employeeSex = "1";
  employeeState = '';
  loading = false;
  avatarUrl: string;

  constructor() { }

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
    console.log({
      "用户名": this.employeeName,
      "电话": this.employeePhone,
      "生日": this.employeeBirthday-0,
      "性别": this.employeeSex,
      "状态": this.employeeState
    })
    this.employeeName = '';
    this.employeePhone = '';
    this.employeeBirthday = '';
    this.employeeSex = "1";
    this.employeeState = '';
  }

  beforeUpload = (file: File) => {
    return
    return new Observable((observer: Observer<boolean>) => {
      console.log(file.type);
      const isJPG = file.type.startsWith('image/');
      if (!isJPG) {
        console.log('上传的不是图片!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        console.log('图片太大应该小于 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          console.log('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        // resolve(width === height && width >= 300);
        resolve(true);
      };
    });
  }

  handleChange(info: { file: UploadFile ,a:1}): void {
    console.log(info);
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        console.log("this.avatarUrl");
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          console.log(this.avatarUrl);
        });
        break;
      case 'error':
        console.log('网络错误');
        this.loading = false;
        break;
    }
  }

}

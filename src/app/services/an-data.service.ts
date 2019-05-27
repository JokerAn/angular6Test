import { Injectable } from '@angular/core';
import { Type } from '@angular/core/src/type';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AnDataService {

  constructor(public NzMessageService: NzMessageService) { }
  public testXiaLa: any = [//测试数据
    { id: 1, name: '百度' }, { id: 2, name: '网易' }, { id: 3, name: '微信' }, { id: 4, name: '高德地图' },
    { id: 5, name: '腾讯' }, { id: 6, name: '小米' }, { id: 7, name: '华为' }, { id: 8, name: '百度地图' },
    { id: 9, name: '锤子' }, { id: 10, name: '淘宝' }, { id: 11, name: '京东' }, { id: 12, name: '阿里巴巴' }
  ];
  public sexList: any = [{ id: 0, name: '女' }, { id: 1, name: '男' }];

  public allUserAlert: any = {//公共告警弹框
    id: 'default',
    popShow: false,
    title: '告警',
    msg: '确定删除选中的数据？',
    btnOk: '确定',
    btnClose: '取消',
    style: { width: '400px' }
  };
  public allUserAlertShow(alertShow = true, res?: {}) {
    if (alertShow) {
      res && console.log(res);
      this.allUserAlert = Object.assign({}, {
        id: 'allUserAlert',
        popShow: true,
        title: '告警',
        msg: '确定删除选中的数据？',
        btnOk: '确定',
        btnClose: '取消',
        style: { width: '400px' }
      }, res);
    } else {
      this.allUserAlert = {
        id: 'allUserAlert',
        popShow: false,
        title: '告警',
        msg: '确定删除选中的数据？',
        btnOk: '确定',
        btnClose: '取消',
        style: { width: '400px' }
      }

    }
  };
  public loading: any = {
    array: [],
    loadingDisplay: 'none'
  };
  public showMsg(msg = '', time = 2500, type = 'success') {
    this.NzMessageService[type](msg, { nzDuration: time })
  }
//获取年月日1993-06-25
  public annyr(time='0',fengefu='') {
    if (time=='0') return;
    var date = new Date(time);
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D = date.getDate();
    var newdata = Y + fengefu + M + fengefu + D;
    return newdata;
  }
//获取年月日时分秒1993-06-25 10:25:32
  public annyrsfm(time='0',fengefu='') {
    if (time=='0') return;
    var date = new Date(time);
    let Y = date.getFullYear();
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    var newdata = Y + fengefu + M + fengefu + D + ' ' + h + ':'+m +':'+ s;
    return newdata;
  }
//获取时分秒 10:25:32
  public ansfm(time = '0', fengefu = ':') {
    if (time == '0') return;
    var date = new Date(time);
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    var newdata = h + fengefu + m + fengefu + s;
    return newdata;
  }
  //获取格式化后的 “ 数字 ”时间 时分秒0:00:00或者 23:59:59
  public anNumberData(time = '0', o59 = 25) {
    if (time == '0') return;
    if (o59 == 25) {return time}
    let times = new Date(time);
    let myyear = times.getFullYear();
    let mymonth: any = times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1;
    let myweekday: any = times.getDate() < 10 ? '0' + times.getDate(): times.getDate();
    let states: any;
    states = o59 > 25 ? '23:59:59' : '00:00:00';
    return Date.parse(myyear + '/' + mymonth + '/' + myweekday + ' ' + states)

  }
  //根据年月日计算年龄
  public getAgeByBirthday(time = '0') {
    if (time == '0') return;
    let newDate:any = +new Date();
    let newTime = +this.annyr(newDate);
    let passTime = +this.annyr(time);
    let age = Math.floor((newTime - passTime) / 10000);
    return age;
  }
}

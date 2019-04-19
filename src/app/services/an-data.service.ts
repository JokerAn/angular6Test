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
  public allUserAlertShow(alertShow =true, res?: {}) {
    if (alertShow) {
      res&&console.log(res);
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
    loadingDisplay:'none'
  };
  public showMsg(msg = '', time = 2500, type = 'success') {
    this.NzMessageService[type](msg, { nzDuration: time })
  }
}

import { Injectable } from '@angular/core';
import * as environment from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class apiUrlsService {
  public basUrl = environment.environment.baseUrl;
  public baseImgUrl = environment.environment.baseImgUrl;//图片展示地址
  // public qiniuUrl = environment.environment.qiniuUrl;
  // public qiniuImgUrl = environment.environment.qiniuImgUrl;
  constructor() {
    console.log(environment);
  }
  //注册
  public register: any = this.basUrl + '/register';
  //登录并且得到用户基本信息
  public login: any = this.basUrl + '/login';
  //上传用户头像
  public ajaxUpload: any = this.basUrl + '/ajaxUpload';
  //新增员工
  public addOneEmployee: any = this.basUrl + '/employee/employeeLists/addOneInfo';
  //根据id查询员工
  public getOneEmployee: any = this.basUrl + '/employee/employeeLists/getOneById';
  //查询员工列表
  public getEmployeeList: any = this.basUrl + '/employee/employeeLists/getList';
  //修改一个员工
  public updateOneEmployee: any = this.basUrl + '/employee/employeeLists/updateOneInfo';
  //删除一个员工
  public delOneEmployee: any = this.basUrl + '/employee/employeeLists/delOneInfo';
  //获取员工列表
  // public login: any = this.basUrl + '/login';
  // //七牛上传图片
  // public qiniuUpload: any = this.qiniuUrl;
  // //七牛展示图片
  // public qiniuImgUrls: any = this.qiniuImgUrl;
}
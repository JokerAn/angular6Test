import { Injectable } from '@angular/core';
import * as environment from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class apiUrlsService {
  public basUrl = environment.environment.baseUrl;
  public qiniuUrl = environment.environment.qiniuUrl;
  public qiniuImgUrl = environment.environment.qiniuImgUrl;
  constructor() {
    console.log(environment);
  }
  //登录
  public login: any = this.basUrl + '/sps/api/v1/login';
  //得到用户基本信息
  public getUserMe: any = this.basUrl + '/sps/api/v1/user/me';
  //得到学校test用户基本信息
  public schoolUserManageSchool: any = this.basUrl + '/sps/api/v1/school/userManageSchool';
  //得到学校test用户基本信息
  public parentParentListByOrgId: any = this.basUrl + '/sps/api/v1/parent/parentListByOrgId';
  //七牛上传图片
  public qiniuUpload: any = this.qiniuUrl;
  //七牛展示图片
  public qiniuImgUrls: any = this.qiniuImgUrl;
}
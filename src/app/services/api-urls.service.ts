import { Injectable } from '@angular/core';
import * as environment from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class apiUrlsService {
  public basUrl = environment.environment.baseUrl;
  constructor() {
    console.log(environment);
  }
  //登录
  public login: any = this.basUrl + '/sps/api/v1/login'
  //得到用户基本信息
  public getUserMe: any = this.basUrl + '/sps/api/v1/user/me'
  //得到学校test用户基本信息
  public schoolUserManageSchool: any = this.basUrl + '/sps/api/v1/school/userManageSchool'
  //得到学校test用户基本信息
  public parentParentListByOrgId: any = this.basUrl + '/sps/api/v1/parent/parentListByOrgId'
}
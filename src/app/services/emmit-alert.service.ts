import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AnDataService } from './an-data.service';
@Injectable({
  providedIn: 'root'
})
export class EmmitAlertService {

  constructor() { }
  public Subject = new Subject();
  public emmitNames: Array<any>;
  public $on: any = this.Subject.asObservable();;
  public send(res: any) {
    console.log('你点击了按钮 广播了的数据是 ' + JSON.stringify(res));
    if (!res.id) {
      console.error('传递的数据格式不正确，应该是一个对象，并且里面必须指定ID! 如： {id:"xxx",data:{xxx:我是要传递的数据}}');
      return
    }
    
    this.$on = this.Subject.next(res);
  };
}

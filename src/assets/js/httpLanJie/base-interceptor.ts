import { Injectable } from '@angular/core';
import { NzMessageService, isTemplateRef } from 'ng-zorro-antd';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { filter, tap } from 'rxjs/operators';
import { logger } from 'codelyzer/util/logger';
import { AnDataService } from '../../../app/services/an-data.service';
import { pipe } from 'rxjs';
@Injectable()

export class NoopInterceptor implements HttpInterceptor {
  constructor(private message: NzMessageService, public anData: AnDataService) { }
  intercept(req: any, next: any) {
    console.log({ req: req, next: next });
    if (req.params && req.params.updates) {
      if (req.params.updates.some((item: any) => {
        return item.param == 'hiddeLoading' && item.value == true
      })) {
        req.params.updates = req.params.updates.filter(item => {
          return item.param != 'hiddeLoading'
        })
      } else {
        this.anData.loading.loadingDisplay = 'block';
        this.anData.loading.array.push(1);
      }
    }
    if (req.body) {
      if (req.body.hiddeLoading === true) {
        delete req.body.hiddeLoading
      } else {
        this.anData.loading.loadingDisplay = 'block';
        this.anData.loading.array.push(1);
      }
    }
    // console.log({ req, next });
    let secureReq = req;
    secureReq = req.clone({});
    console.log({ 'secureReq': secureReq });
    return next.handle(secureReq).pipe(
      tap(
        event => {
          console.log(event);
        },
        error => {
          error.method = req.method;
          error.body = req.body;
          console.log(req);
          console.log(`${error.status} 的接口失败 失败信息是下边这一行`);
          console.log(error);
          if (error.url.includes('api/v1/login')) {
            this.message.warning('账户或密码错误')
          } else {
            this.message.error(`服务器错误 错误代码 ${error.status}`);
            console.log(`服务器错误 错误代码 ${error.status}`);
          }
        }
      )
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpEvent, HttpRequest, HttpInterceptor, HttpEventType }
  from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, filter, tap, finalize, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { AnDataService } from './an-data.service'
@Injectable({
  providedIn: 'root'
})

export class AnHttpService {
  public http: any;
  constructor(HttpClient: HttpClient, public anData: AnDataService) {
    this.http = HttpClient
  }
  public checkLoading() {
    // console.log(this.anData.loading.array);
    let indexs = this.anData.loading.array.indexOf(1);
    // console.log(indexs);
    if (indexs == -1) {
      this.anData.loading.loadingDisplay = 'none';
      this.anData.loading.array.length = 0;
      // console.log('我关闭了loading！')
    } else {
      this.anData.loading.array[indexs] = 2;
      let indexs2 = this.anData.loading.array.indexOf(1);
      if (indexs2 == -1) {
        this.anData.loading.loadingDisplay = 'none';
        this.anData.loading.array.length = 0;
        // console.log('我关闭了loading！')
      } else {
        // console.log('this.anData.loading.array.里面还有 1 ！'+JSON.stringify(this.anData.loading.array))
      }
    }
  }
  public get(url: any, myOptions: any = {}) {
    let httpParams = new HttpParams();
    if (myOptions.params) {
      for (const key in myOptions.params) {
        if (myOptions.params[key] === false || myOptions.params[key]) {
          httpParams = httpParams.set(key, myOptions.params[key]);
        }
      }
    }
    let options: any = {
      params: httpParams,
      headers: new HttpHeaders({})
    }
    if (myOptions['responseType'] != undefined) {
      options.responseType = myOptions['responseType']
    }
    if (localStorage.user_token) {
      options.headers = new HttpHeaders({
        'Authorization': localStorage.user_token
      })
    };
    console.log({ 'options': options });
    return this.http.get(url, options).pipe(
      map((res: any) => {
        return res
      })
    )
  }

  public post(url, data={}, myOptions={}) {
    let options:any = {
      headers: new HttpHeaders({})
    };
    if (myOptions['responseType'] != undefined) {
      options.responseType = myOptions['responseType']
    }
    if (localStorage.user_token) {
      options.headers = new HttpHeaders({
        'Authorization': localStorage.user_token
      })
    }
    return this.http.post(url, data, options).pipe(
      map((res: any) => {
        console.log('99999999999999999999999999999');
        this.checkLoading();
        return res
      }
      ))

  }

  public put(url, data?: Object, cb?: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.user_token,
      })
    };
    const vm = this;
    vm.http.put(url, data, httpOptions)
      .subscribe(res => {
        cb(res);
      });
  }

  public delete(url, params?: Object, cb?: Function) {
    let httpParams = new HttpParams();
    const httpOptions = new HttpHeaders({
      'Authorization': localStorage.user_token,
    })
    const vm = this;
    if (params) {
      for (const key in params) {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    vm.http.delete(url, {
      params: httpParams,
      headers: httpOptions
    })
      .subscribe(data => {
        cb(data);
      });
  }

  public patch(url, data?: Object, cb?: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.user_token,
      })
    };
    const vm = this;
    vm.http.patch(url, data, httpOptions)
      .subscribe(res => {
        cb(res);
      });
  }

}
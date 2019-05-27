import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SexPipe } from '../../pipe/sex.pipe';
import { AnDataService } from 'src/app/services/an-data.service';
import { EmmitAlertService } from 'src/app/services/emmit-alert.service';
import { AnHttpService } from 'src/app/services/an-http.service';
import { apiUrlsService } from 'src/app/services/api-urls.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  edit = false;
  canshu: any;
  employeeList: any = [];
  employeeListCopy: any = [];
  widthConfig = ['80px', '200px', '100px', '100px', '100px', '100px', '100px', '100px', '100px'];
  searchMore: boolean = false;
  searchCondition: any = {
    name: '',
    sex: '',
    age: '',
    state: ''
  };
  selectedUserHeaderImg = '';
  UserImgBig_show = false;
  constructor(private routeInfo: ActivatedRoute, private anData: AnDataService, public emmitAlert: EmmitAlertService,
    private anHttp: AnHttpService, private router: Router, private apiUrls: apiUrlsService,
    private render2: Renderer2, private el: ElementRef) {
    this.routeInfo.queryParams.subscribe((res) => {
      this.canshu = res.id;
      console.log(res);
    });
    if (this.emmitAlert.$on) {
      this.emmitAlert.$on.subscribe((emmitData: any) => {
        console.group('我是employee.component.ts页面接收到的emmitAlert--' + emmitData.id);
        switch (emmitData.id) {
          case 'deleteEmployeeOneLine':
            if (emmitData.btnClick) {
              this.deleteEmployeeListOneFun(this.anData.allUserAlert.datas);
            } else {
              console.log('你点击了取消按钮');
            }
            this.anData.allUserAlert.popShow = false;
            break
          default:
            console.log('接收到广播 但是没有对应的操作 走了默认')
        }
        console.groupEnd();
      })
    }
  }

  ngOnInit() {
    this.getEmployee();
  }
  //请求员工list数据
  getEmployee() {
    let me = this;

    this.anHttp.get(this.apiUrls.getEmployeeList, {}).subscribe((result: any) => {
      this.anData.showMsg(result.msg);
      if (result.msg.includes('成功')) {
        this.employeeList = result.data;
      } else {
        this.employeeList = [];
      }

      this.employeeList.map((item: any) => {
        item.edit = false;
        item.userHeaderImg_copy = item.userHeaderImg ? this.apiUrls.baseImgUrl + item.userHeaderImg : '/assets/images/user@2x.png'
      })
      this.employeeListCopy = JSON.parse(JSON.stringify(this.employeeList));
    })

  }
  //新增一条数据
  addEmployeeList() {
    this.router.navigate(['/addemployee'], {
      queryParams: { canshu: '123' }
    })
  }
  //删除一行弹出告警
  deleteEmployeeListOneAlert(indexs,l) {
    this.anData.allUserAlertShow(true, {
      id: 'deleteEmployeeOneLine',
      popShow: true,
      title: '告警',
      msg: '确定删除选中的数据？',
      btnOk: '确定',
      btnClose: '取消',
      style: { width: '400px' },
      datas: {
        index: indexs,
        data: l,
      }
    });
  }
  //删除一行具体代码
  deleteEmployeeListOneFun(data:any) {
    let canshu = { id: data.data['_id'] };

    
    this.anHttp.post(this.apiUrls.delOneEmployee, canshu).subscribe((result: any) => { 
      console.log(result);
      this.anData.showMsg(result.msg);
      if (result.msg.includes('成功')) { 
        this.getEmployee();
      }
    })
    
  }
  //点击修改
  eidtEmployeeOnleInfo(indexs) {
    console.log(indexs);
    this.employeeList[indexs].edit = true;
  }
  //保存修改
  saveEidtEmployeeOnleInfo(indexs) {
    this.employeeList[indexs].edit = false;
    console.log(1);
    this.anHttp.post(this.apiUrls.updateOneEmployee, this.employeeList[indexs]).subscribe((result: any) => { 
      console.log(result);
      this.getEmployee();
    })
  }
  //取消修改
  notSaveEidtEmployeeOnleInfo(indexs) {
    this.getEmployee();
    console.log(this.employeeList);
  }
  //重置
  searchClear() {
    for (let key in this.searchCondition) {
      this.searchCondition[key] = null;
    }
    this.getEmployee();

  }
  //展开收起
  searchMoreF(res: boolean) {
    if (res) {
      this.searchMore = true;
    } else {
      this.searchCondition.age = '';
      this.searchCondition.sex = null;
      this.searchCondition.state = '';
      this.searchMore = false;
    }
  }
  public searchConditionFinally: any;
  searchF() {
    console.log(this.employeeListCopy);
    this.searchConditionFinally = {};
    for (let key in this.searchCondition) {
      if (this.searchCondition[key]) {
        this.searchConditionFinally[key] = this.searchCondition[key]
      }
    }
    this.employeeList = this.employeeListCopy.filter((item: any) => {
      if (item.name.includes(this.searchCondition.name || '')) {
        return item
      }
    })
    console.log(this.employeeList);
  }
  //点击查看高清头像
  showUserImgBig(l:any, e:any) {
    const DATA_ERROR=e.target.getAttribute('error');
    console.log(l.userHeaderImg);
    if (l.userHeaderImg) {
      if (DATA_ERROR == 'true') {
        this.selectedUserHeaderImg = '/assets/images/userImgError.png';
        this.UserImgBig_show = true;
      } else {
        this.selectedUserHeaderImg = l.userHeaderImg_copy;
        this.UserImgBig_show = true;
      }
    }
  }
  imgErrors(e:any) {
    console.log(e.target.attributes);
    e.target.src = '/assets/images/userImgError.png';
    this.render2.setAttribute(e.target, 'error', 'true');
    return false;
  }
  //点击进入详情
  intiInfo(l) { 
    console.log(l);
    this.router.navigate(['/addemployee'], { queryParams: { employee_id: l['_id'] } });
  }
}

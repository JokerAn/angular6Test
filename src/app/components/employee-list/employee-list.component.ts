import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SexPipe } from '../../pipe/sex.pipe';
import { AnDataService } from 'src/app/services/an-data.service';
import { EmmitAlertService } from 'src/app/services/emmit-alert.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  edit: false;
  canshu: any;
  employeeList: any;
  widthConfig = ['200px', '100px', '100px', '100px', '100px', '100px', '100px', '100px'];
  constructor(private routeInfo: ActivatedRoute, private anData: AnDataService, public emmitAlert: EmmitAlertService) {
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
              this.deleteEmployeeListOneFun(this.anData.allUserAlert.datas.index);
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
    this.employeeList = [
      { bianma: 'esss-ffff-0001', name: '张三', sex: null, age: '18', job: '屠夫', state: '2', remark: '我是张三' },
      { bianma: 'esss-ffff-0003esss-ffff-0003esss-ffff-0003', name: '女帝', sex: '0', age: '18', job: '模特', state: '2', remark: '凤凰居民' },
      { bianma: 'esss-ffff-0004', name: '娜美', sex: '0', age: '18', job: '司机', state: '1', remark: '宣传部规划' },
      { bianma: 'esss-ffff-0002', name: '李四', sex: null, age: '18', job: '饲养员', state: '1', remark: '我是张三' },
      { bianma: 'esss-ffff-0005', name: '路飞', sex: '1', age: '18', job: '海贼', state: '2', remark: '而非' },
      { bianma: 'esss-ffff-0006', name: '山治', sex: '1', age: '18', job: 'w厨师', state: '2', remark: '撒旦法' },
      { bianma: 'esss-ffff-0006', name: '山治大哥', sex: '1', age: '28', job: '力量', state: '2', remark: '防辐射的女' },
      { bianma: 'esss-ffff-0006', name: '山治二哥', sex: '1', age: '25', job: '火', state: '2', remark: '昂和备案的说法' },
      { bianma: 'esss-ffff-0006', name: '山治老爸', sex: '1', age: '58', job: '将军', state: '2', remark: '撒生日歌旦法' },
      { bianma: 'esss-ffff-0007', name: '索隆', sex: '1', age: '18', job: '剑客', state: '1', remark: '阿斯顿发' }
    ];
    this.employeeList.map((item) => { 
      item.edit = false;
    })
  }
  //新增一条数据
  addEmployeeList(res:any) { 
    this.employeeList = [res, ...this.employeeList];
    console.log(this.employeeList)
  }
  //删除一行弹出告警
  deleteEmployeeListOneAlert(indexs) { 
    this.anData.allUserAlertShow(true, {
      id: 'deleteEmployeeOneLine',
      popShow: true,
      title: '告警',
      msg: '确定删除选中的数据？',
      btnOk: '确定',
      btnClose: '取消',
      style: { width: '400px' },
      datas: {
        index: indexs
      }
    });
  }
  //删除一行具体代码
  deleteEmployeeListOneFun(indexs) { 
    this.employeeList=this.employeeList.filter((item, index) => { 
      if (index != indexs) { 
        return item
      }
    })
    this.anData.showMsg('删除成功');
  }
  //点击修改
  eidtEmployeeOnleInfo(indexs) { 
    console.log(indexs);
    this.employeeList[indexs].edit = true;
  }
  //保存修改
  saveEidtEmployeeOnleInfo(indexs) { 
    this.employeeList[indexs].edit = false;
    console.log(indexs);
    console.log(this.employeeList);
    console.log(this.employeeList[indexs]);
    this.anData.showMsg('保存成功');
    
  }
  //取消修改
  notSaveEidtEmployeeOnleInfo(indexs) { 
    this.getEmployee();
    console.log(this.employeeList);
  }
}

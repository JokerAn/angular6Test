import { Component, OnInit } from '@angular/core';
import { EmmitAlertService } from 'src/app/services/emmit-alert.service';
import { AnDataService } from 'src/app/services/an-data.service';

@Component({
  selector: 'app-all-user-alert',
  templateUrl: './all-user-alert.component.html',
  styleUrls: ['./all-user-alert.component.scss']
})
export class AllUserAlertComponent implements OnInit {
  public loadingShow: boolean = false;
  public allUserAlertStyle: any = {};
  constructor(private emmitAlert: EmmitAlertService, public anData: AnDataService) {
    // console.log(this.anData)
  }

  ngOnInit() {
    console.log('allUserAlert  ngOnInit ');
    if (this.emmitAlert.$on) {
      this.emmitAlert.$on.subscribe((res: any) => {
        console.log('我是all-user-alert.component.ts弹框页面，我接受到了数据 ' + JSON.stringify(res));
      })
    }
  }
  allUserAlertAjax(res) {
    console.log(res);
    this.emmitAlert.send(res);
  }
}

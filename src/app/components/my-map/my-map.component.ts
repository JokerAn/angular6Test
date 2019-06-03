import { Component, OnInit } from '@angular/core';
declare var AMap: any;//这句话很重要！！！没有就会报错
@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss']
})
export class MyMapComponent implements OnInit {
  map: any;
  constructor() { }

  ngOnInit() {
    this.mapInit();
  }
  mapInit() {
    this.map = new AMap.Map('container2', {
      zoom: 15,//缩放级别// PC上，参数zoom可设范围：[3,18]；// 移动端：参数zoom可设范围：[3,19]
      center: [116.18500, 39.90600],//设置地图中心点坐标
      viewMode: '2D',  //设置地图模式
      lang: 'zh_cn',  //设置地图语言类型
    });
    //实时路况图层
    var trafficLayer = new AMap.TileLayer.Traffic({
      zIndex: 10
    });
    this.map.add(trafficLayer);//添加图层到地图
    var marker = new AMap.Marker({
      position: [116.18300, 39.90618]//位置
    })
    this.map.add(marker);//添加到地图
  }
}

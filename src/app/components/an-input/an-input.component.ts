import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-an-input',
  templateUrl: './an-input.component.html',
  styleUrls: ['./an-input.component.scss']
})
export class AnInputComponent implements OnInit {
  @Input() searchTopLeft:any;
  @Input() ClsoeTopRight:any;
  @Input() anInutStyle:any;
  @Input() searchKey:any;
  @Input() inputPlaceholder:any;
  @Output() private outer = new EventEmitter<string>();


  constructor() {
   }

  ngOnInit() {
    this.searchTopLeft = this.searchTopLeft || ['4', '4'];
    this.ClsoeTopRight = this.ClsoeTopRight || this.searchTopLeft || ['4', '4'];
    this.anInutStyle = this.anInutStyle || {};
    this.searchKey = this.searchKey || '';
    this.inputPlaceholder = this.inputPlaceholder || '';
    // console.log(this.searchKey);
    
  }
  searchFuc(event:any) {
    var keys = event.keyCode ? event.keyCode : event.which;
    if(keys==13){
      this.outer.emit(this.searchKey);
    }
  }
  searchFucClick(event:any) {
    
      this.outer.emit(this.searchKey);
    
  }
  //清除输入框
  clearSearchKey(){
    this.searchKey='';
    this.outer.emit(this.searchKey);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: any, otherName?: any): any {
    if (otherName && otherName.length > 0) {
      if (value == 1) {
        return '男'
      } else if (value == 0) {
        return '女'
      } else {
        return otherName;
      }
    } else {
      if (value == 1) {
        return '男'
      } else if (value == 0) {
        return '女'
      } else {
        return '未知';
      }
    }


  }

}

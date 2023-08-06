import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'date'
})
export class MyDatePipe implements PipeTransform {
  transform(value: any): any {
    if (value instanceof Timestamp) {
      const date = value.toDate();
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(date, 'MM-yyyy');
    }

    return value;
  }
}

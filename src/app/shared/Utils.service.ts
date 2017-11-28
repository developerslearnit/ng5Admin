import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

     constructor() { }

     public dateAdd(date, interval, units): Date {
          var ret = new Date(date);
          switch (interval.toLowerCase()) {
              case 'year': ret.setFullYear(ret.getFullYear() + units); break;
              case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); break;
              case 'month': ret.setMonth(ret.getMonth() + units); break;
              case 'week': ret.setDate(ret.getDate() + 7 * units); break;
              case 'day': ret.setDate(ret.getDate() + units); break;
              case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
              case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
              case 'second': ret.setTime(ret.getTime() + units * 1000); break;
              default: ret = undefined; break;
          }
  
          return ret;
          //return `${ret.getDate()}/${ret.getMonth() + 1}/${ret.getFullYear()}`;
      }
  
  
      public formatJsonDate(date) {
          var jsonDate = new Date(date);
          let month = Number((jsonDate.getMonth() + 1)) < 10 ? '0' + (jsonDate.getMonth() + 1) : (jsonDate.getMonth() + 1);
          let day = Number(jsonDate.getDate()) < 10 ? '0' + jsonDate.getDate() : jsonDate.getDate();
          let year = Number(jsonDate.getFullYear());
  
          return `${day}/${month}/${year}`;
  
      }
}
import { Injectable } from '@angular/core';

@Injectable()
export class DateTransformService {

  constructor() { }
  transform( date: Date ){
    var dateTemp;
    dateTemp=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    return dateTemp;
  }
}

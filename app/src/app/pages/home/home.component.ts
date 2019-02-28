import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  maker = {
    'todayNewUser': '',//今日新增创客数
    'currentUserCount': '',//当前创客总数
  };
  partner ={
    'currentPartnerCount':''
  }
  customer={
    'todayNewUser':'',
    'currentUserCount': ''
  }
  order={
    'currentOrderCount':''
  }
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getCustomHeaders4('kalanchoe-manager/v1/kalanchoe/backstage/marker')
      .subscribe(e => {
        this.maker = e.result;
      })
    this.http.getCustomHeaders4('kalanchoe-manager/v1/kalanchoe/backstage/partner')
      .subscribe(e => {
        this.partner = e.result;
      })
    this.http.getCustomHeaders4('kalanchoe-manager/v1/kalanchoe/backstage/user')
      .subscribe(e => {
        this.customer = e.result;
      })
    this.http.getCustomHeaders4('kalanchoe-manager/v1/kalanchoe/backstage/order')
      .subscribe(e => {
        this.order = e.result;
      })
  }

}

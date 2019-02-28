import { post } from 'selenium-webdriver/http';
import { Http } from '@angular/http';
import { HttpService } from './../../../shared/service/http-serve.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  SwiperConfigInterface,
  SwiperCoverflowEffectInterface,
  SwiperComponent,
  SwiperZoomInterface
} from 'ngx-swiper-wrapper';

const zoomInterface: SwiperZoomInterface = {
  maxRatio: 5,
  toggle: true
}

@Component({
  selector: 'app-approve-info',
  templateUrl: './approve-info.component.html',
  styleUrls: ['./approve-info.component.css']
})
export class ApproveInfoComponent implements OnInit {

  @ViewChild('curImg') curImg;
  @ViewChild('imgBig') imgBig;
  public imgUrl;
  public active = false;

  public rows;

  config: SwiperConfigInterface;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit() {
    var id = this.route.snapshot.queryParams.id;
    this.http.getCustomHeaders("/v1/app/back/etpCers/" + id )
      .subscribe(res => {
        let data = res.result;
        // var ipos = data.bus.busUrl.indexOf('static');
        // var baseUrl = 'http://192.168.111.212:6200/';
        // data.bus.busUrl = baseUrl + data.bus.busUrl.substr(ipos).replace(/\\/g,'/');
        // data.idCer.idUrl = baseUrl + data.idCer.idUrl.substr(ipos).replace(/\\/g,'/');
        // data.controllerCer.idUrl = baseUrl + data.controllerCer.idUrl.substr(ipos).replace(/\\/g,'/');
        this.rows = data;
      });
    
    this.config={
      direction: 'horizontal',
      grabCursor: true,
      centeredSlides: true,
      zoom: zoomInterface
    }
  }
  // 图片放大
  imgScale(url) {
    this.imgUrl = url;
    this.active = true;
  }
  close(e) {
    this.active=e;
  }
}

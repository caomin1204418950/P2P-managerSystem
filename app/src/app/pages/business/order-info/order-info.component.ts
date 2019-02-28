import { post } from 'selenium-webdriver/http';
import { Http } from '@angular/http';
import { HttpService } from './../../../shared/service/http-serve.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  SwiperComponent,
  SwiperDirective,
  SwiperConfigInterface,
  SwiperScrollbarInterface,
  SwiperPaginationInterface,
  SwiperCoverflowEffectInterface,
  SwiperNavigationInterface
} from 'ngx-swiper-wrapper';

// 3D 切换效果参数设置
const coverflowEffectConfig: SwiperCoverflowEffectInterface = {  
  rotate: 0,  
  stretch: 200,  
  depth: 200,  
  modifier: 1,  
  slideShadows: false
};

// 前进后退按钮配置
const navigationConfig: SwiperNavigationInterface = {  
  nextEl: '.swiper-button-next',  
  prevEl: '.swiper-button-prev',  
  hideOnClick: true  
  // disabledClass?: string;  
  // hiddenClass?: string;
};

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  public imgUrl;
  public active = false;
  public mask = false;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    keyboard: true,
    mousewheel: false,
    navigation: navigationConfig,
    spaceBetween: 30,
    loop: false,
    loopFillGroupWithBlank: true
  };
  appointTime;
  appointConfirmTime;

  public rows={
    "loanContractInfo": {},
    "loanApply":{
      createDate:'',
      updateDate:'',
      status:'',
    },
    repayPlan:'',
    "applyDataList":[],
    "etpId":""
  };

  public basicInfoUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit() {
    var id = this.route.snapshot.queryParams.id;
    this.http.getCustomHeaders("/v1/app/back/loans/" + id )
      .subscribe(res => {
        let data = res.result;
        this.rows = data;
        if(this.rows.applyDataList){
          this.rows.applyDataList.forEach(item=>{
            if(item.type=='multiplePic'){
              item.value=this.transformStr(item.value)
            }
          })
        }
        this.basicInfoUrl = 'http://117.41.185.26:4200/companyReport/basicInfo?id=' + this.rows.etpId;
      })
  };
  transformTime(e){
    return e ? (e.match(/14:00:00/) ? e.replace(/14:00:00/, 'PM') : e.replace(/08:00:00/, 'AM')) : '';
  }
  transformStr(e){
    return JSON.parse(e);
  }

  // 图片放大
  imgScale(url) {
    this.imgUrl = url;
    this.active = true;
  }
  close(e){
    this.active = e;
  }
}

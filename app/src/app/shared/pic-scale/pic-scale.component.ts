import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import {
  SwiperConfigInterface,
  SwiperCoverflowEffectInterface,
  SwiperComponent,
  SwiperZoomInterface
} from 'ngx-swiper-wrapper';

const zoomInterface: SwiperZoomInterface = {
  maxRatio: 3,
  toggle: true
}

@Component({
  selector: 'pic-scale',
  templateUrl: './pic-scale.component.html',
  styleUrls: ['./pic-scale.component.css']
})
export class PicScaleComponent implements OnInit {

  config: SwiperConfigInterface;

  @Input() ImgUrl: String;
  @Output() closeImg = new EventEmitter();
  public active=true;

  constructor() { }

  ngOnInit() {
    this.config={
      direction: 'horizontal',
      grabCursor: true,
      centeredSlides: true,
      zoom: zoomInterface
    }
  }
  close(){
    this.active=false;
    this.closeImg.emit(this.active)
  }

}

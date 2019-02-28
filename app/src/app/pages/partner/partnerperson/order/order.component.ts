import { Component, OnInit } from '@angular/core';
import { DateTransformService } from './../../../../shared/service/date-transform.service';
import { HttpService } from './../../../../shared/service/http-serve.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;
  total = 0

  //查询变量
  findPhone=''
  findEtpName=''
  findNo=''
  findStatus=''
  wantStartTime=''
  wantEndTime=''
  findProductId=''
  findReleation=''
  pageNum=1
  //路由接收参数
  userId
  phone

  //所有产品
  productList=[]

  data=[]
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private dateTransform: DateTransformService,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams.userid
    this.phone = this.route.snapshot.queryParams.userTle
    this.getData()
    this.getPatNum()
  }
  getData(){
    this.http.getCustomHeaders4(
      'kalanchoe-manager/v1/kalanchoe/backstage/distribution/orderDataGrid?mobile=' +this.findPhone +
      '&createTimeStart=' +this.wantStartTime +
      '&createTimeEnd=' +this.wantEndTime+
      '&etpName=' + this.findEtpName +
      '&status=' + this.findStatus+
      '&no=' + this.findNo+
      '&releation=' + this.findReleation+
      '&productId=' + this.findProductId +
      '&userId=' + this.userId +
      '&pageNum=' + this.pageNum +
      '&pageSize=' + 10
    ).subscribe(res => {
      this.data=res.result.list
      this.total=res.result.total
    })
  }
  getPatNum(){
    this.http.getGroupDateGrid(
      'kalanchoe-manager/v1/kalanchoe/backstage/product'
    ).subscribe(res => {
      this.productList=res.result
    })
  }
  search() {
      this.pageNum=1
    this.getData()
  }
  reset() {
    this.findPhone=''
    this.findEtpName=''
    this.findNo=''
    this.findStatus=''
    this.findProductId=''
    this.findReleation=''
    this.startValue=null
    this.endValue=null
    this.wantStartTime=''
    this.wantEndTime=''
  }
  pageSearch($event) {
    this.pageNum = $event
    this.getData()
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date
    this.wantStartTime = this.dateTransform.transform(date) + ' 00:00:00'
  }

  onEndChange(date: Date): void {
    this.endValue = date
    this.wantEndTime = this.dateTransform.transform(date) + ' 23:59:59'
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
  }

  handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }
}

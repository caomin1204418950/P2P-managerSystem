import { Component, OnInit } from '@angular/core';
import { DateTransformService } from '../../../../shared/service/date-transform.service'
import { HttpService } from '../../../../shared/service/http-serve.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;
  total = 0
  pageNum = 1

  data = [
  ]
  list = []
  //查询变量
  findPhone = ''
  findRegisterSource = ''
  findConnect = ''
  wantStartTime = ''
  wantEndTime = ''

  //接收路由参数
  userId
  userTle

  //普通创客、合伙人
  normalMaker
  countPartner
  constructor(
    private http: HttpService,
    private dateTransform: DateTransformService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams.userid;
    this.userTle = this.route.snapshot.queryParams.userTle;
    this.getData()
    this.getPatNum()
  }
  getData() {
    this.http.getCustomHeaders4(
      'kalanchoe-manager/v1/kalanchoe/backstage/distribution/partnerDataGrid?mobile=' + this.findPhone +
      '&registerTimeStart=' + this.wantStartTime +
      '&registerTimeEnd=' + this.wantEndTime +
      '&registerSource=' + this.findRegisterSource +
      '&releation=' + this.findConnect +
      '&userId=' + this.userId +
      '&pageNum=' + this.pageNum +
      '&pageSize=' + 10
    ).subscribe(res => {
      this.list = res.result.list
      this.total = res.result.total
      this.addIndexList()
    })
  }
  getPatNum() {
    this.http.getGroupDateGrid(
      'kalanchoe-manager/v1/kalanchoe/backstage/user/type?id=' + this.userId
    ).subscribe(res => {
      this.normalMaker = res.result.total
      this.countPartner = res.result.countPartner
    })
  }
  addIndexList() {
    var list = this.list
    var List = list.map((item, index) => {
      item['index']=(this.pageNum-1)*10+index+1      
      return item
    })
    this.data = List
  }

  search() {
      this.pageNum=1
    this.getData()
  }
  reset() {
    this.findPhone = ''
    this.findRegisterSource = ''
    this.findConnect = ''
    this.startValue=null
    this.endValue=null
    this.wantStartTime=''
    this.wantEndTime=''
  }
  pageSearch($event) {
    this.pageNum = $event
    this.getData()
  }
  //card one
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

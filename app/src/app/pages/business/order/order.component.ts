import { Component, OnInit } from '@angular/core';
import { DateTransformService } from './../../../shared/service/date-transform.service';
import { HttpService } from './../../../shared/service/http-serve.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class businessorderComponent implements OnInit {
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;
  //查询变量
  findPhone = ''
  findEtpName = ''
  findNo = ''
  findStatus = ''
  wantStartTime = ''
  wantEndTime = ''
  findMinTerm = ''
  findMaxTerm = ''
  pageNum = 1
  total = 0

  data = []
  constructor(
    private http: HttpService,
    private dateTransform: DateTransformService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.findPhone = this.route.snapshot.queryParams.findPhone
    this.findEtpName = this.route.snapshot.queryParams.etpName

    if(this.findPhone==undefined){
      this.findPhone=''
    }
    if(this.findEtpName==undefined){
      this.findEtpName=''
    }
    this.getData()
  }
  getData() {
    this.http.getCustomHeaders(
      '/v1/app/back/loansGrid?regMobile='
      + this.findPhone
      + "&no=" + this.findNo
      + "&etpName=" + this.findEtpName
      + "&createStartDate=" + this.wantStartTime
      + "&createEndDate=" + this.wantEndTime
      + "&minTerm=" + this.findMinTerm
      + "&maxTerm=" + this.findMaxTerm
      + "&status=" + this.findStatus
      + '&pageNum=' + this.pageNum + '&pageSize=10'
    ).subscribe(res => {
      this.data = res.result.list;
      this.total = res.result.total
    })
  }

  search() {
    this.getData()
  }
  pageSearch($event) {
    this.pageNum = $event
    this.getData()
  }
  reset() {
    this.findPhone = ''
    this.findNo = ''
    this.findEtpName = ''
    this.findMinTerm = ''
    this.findMaxTerm = ''
    this.findStatus = ''
    this.startValue = null
    this.endValue = null
    this.wantStartTime=''
    this.wantEndTime=''
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

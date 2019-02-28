import { Component, OnInit } from '@angular/core';
import { DateTransformService } from '../../../../shared/service/date-transform.service'
import { HttpService } from '../../../../shared/service/http-serve.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-capitalsubsidiary',
  templateUrl: './capitalsubsidiary.component.html',
  styleUrls: ['./capitalsubsidiary.component.css']
})
export class CapitalsubsidiaryComponent implements OnInit {
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;
  //查找变量
  findUse=''
  findFlow=''
  wantStartTime=''
  wantEndTime=''
  pageNum='1'
  total='30'
  //接收的手机号
  mobile=''

  data=[]
  constructor(
    private dateTransform: DateTransformService,
    private http: HttpService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.mobile=this.route.snapshot.queryParams.mobile
    this.getData()
  }

  getData(){
    this.http.getGroupDateGrid('kalanchoe-manager/v1/balance/user/back/dataGrid?'
    +'pageNum='+this.pageNum
    +'&pageSize=10'
    +'&mobile='+this.mobile
    +'&createStartDate='+this.wantStartTime
    +'&createEndDate='+this.wantEndTime
    +'&type='+this.findUse
    +'&income='+this.findFlow).subscribe(e => {
     this.data=e.result.list.list
     this.total=e.result.list.total
    })
  }
  search(){
    this.getData()
    this.pageNum='1'
  }
  reset(){
    this.findUse=''
    this.findFlow=''
    this.startValue=null
    this.endValue=null
    this.wantStartTime=''
    this.wantEndTime=''
    this.pageNum='1'
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

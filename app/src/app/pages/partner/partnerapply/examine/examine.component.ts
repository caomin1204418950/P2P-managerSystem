import { DateTransformService } from './../../../../shared/service/date-transform.service';
import { HttpService } from './../../../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Http } from '@angular/http/src/http';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-examine',
  templateUrl: './examine.component.html',
  styleUrls: ['./examine.component.css']
})
export class ExamineComponent implements OnInit {
  userid
  status
  remark

  applyInfo = {
    appUserId: '',
    applyTime: '',
    checkTime: '',
    checkUser: '',
    createDate: '',
    id: '',
    level: '',
    mode: '',
    remark: '',
    status: '',
    updateDate: ''
  }
  baseInfo = {
    address: '',
    createDate: '',
    education: '',
    groupId: '',
    groupName: '',
    guestUrl: '',
    headUrl: '',
    id: '',
    industry: '',
    inviteCode: '',
    inviteUrl: '',
    inviterId: '',
    inviterMobile: '',
    inviterUpperId: '',
    live: '',
    mobile: '',
    post: '',
    registerSource: '',
    registerTime: '',
    status: '',
    type: '',
    updateDate: '',
    workAge: '',
    realName: ''
  }
  statisticsInfo = {
    directCustomer: '',
    directCustomerOrderCount: '',
    directCustomerOrderSum: '',
    primaryCustomer: '',
    primaryCustomerOrderCount: '',
    primaryCustomerOrderSum: '',
    secondaryCustomer: '',
    secondaryCustomerOrderCount: '',
    secondaryCustomerOrderSum: ''
  }

  constructor(
    private http: HttpService, 
    private dateTransform: DateTransformService,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService

  ) {
    
  }

  ngOnInit() {
    this.userid = this.route.snapshot.queryParams.userid;
    this.getMessage()
  }
  
  getMessage (){
    this.http.getCustomHeaders4(
      'kalanchoe-manager/v1/kalanchoe/backstage/partner/' + this.userid
    ).subscribe(res => {
      this.applyInfo = res.result.applyInfo;
      this.baseInfo = res.result.baseInfo;
      this.statisticsInfo = res.result.statisticsInfo;
      if(res.result.applyInfo.status == 0){
        this.applyInfo.status = "未审核";
      } else if(res.result.applyInfo.status == 1){
        this.applyInfo.status = "审核通过";
      } else if(res.result.applyInfo.status == 2){
        this.applyInfo.status = "审核不通过";
      }
    })
  }
  examine (){
    if(!this.status || this.status == ""){
      this.message.error('请选择审核结果')
      return false;
    }
    if(!this.remark || this.remark == ""){
      this.message.error('请选择审核原因')
      return false;
    }
    let params = [{
      id: this.applyInfo.id,
      appUserId: this.userid,
      status: Number(this.status),
      remark: this.remark
    }]
    this.http.patchGroup(
      'kalanchoe-manager/v1/kalanchoe/backstage/partner',params
    ).subscribe(res => {
      if(res.code == "200"){
        this.router.navigate(['/app/partner/partnerapply']);
      }else {
      }
    })
  }
}
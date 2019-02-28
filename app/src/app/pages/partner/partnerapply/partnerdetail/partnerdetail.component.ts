import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../../../../shared/service/http-serve.service';


@Component({
  selector: 'app-partnerdetail',
  templateUrl: './partnerdetail.component.html',
  styleUrls: ['./partnerdetail.component.css']
})
export class PartnerdetailComponent implements OnInit {
  userid
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
    realName:''
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
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

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

}

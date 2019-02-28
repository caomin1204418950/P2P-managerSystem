import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../../../../shared/service/http-serve.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  userid
  pageNum = 1
  total = 0
  selectedBasic = true
  selectedCheck = false
  selectedLogin = false
  showBasicInm = true
  showCheckInm = false
  showLoginInm = false
  identificationInfo
  showidentificationInfo
  // 基本信息
  public telNum
  public avatar
  public inviter
  public registrationSource
  public status
  public statusText
  public group
  public education
  public workTime
  public job
  public position
  public city

  // 认证信息
  public realName
  public sex
  public nation
  public birthday
  public idNum
  public address
  public expireDate
  public cerOrg
  public frontUrl
  public oppositeUrl

  list=[]
  data=[]

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.userid = this.route.snapshot.queryParams.userid
    this.getDetailData()
    this.getLoginData()
    console.log(this.userid)
  }
  getDetailData() {
    let id = this.userid
    this.http.getGroupDateGrid('kalanchoe-manager/v1/kalanchoe/backstage/user/' + id)
      .subscribe(e => {
        console.log(e.result)
        this.identificationInfo = e.result.identificationInfo
        this.telNum = e.result.baseInfo.mobile
        if (e.result.baseInfo.status == 1) {
          this.statusText = '启用'
        } else {
          this.statusText = '禁用'
        }
        this.avatar = e.result.baseInfo.headUrl
        this.status = e.result.baseInfo.status
        if (e.result.baseInfo.inviterMobile == null) {
          this.inviter = '无'
        } else {
          this.inviter = e.result.baseInfo.inviterMobile //邀请人
        }

        //基本信息
        this.registrationSource = e.result.baseInfo.registerSource
        this.group = e.result.baseInfo.groupName //分组
        this.education = e.result.baseInfo.education //最高学历
        this.workTime = e.result.baseInfo.workAge ? (e.result.baseInfo.workAge + "年") : ''
        this.job = e.result.baseInfo.industry//当前所在行业
        this.city = e.result.baseInfo.live
        this.position = e.result.baseInfo.post//当前所在岗位

        //认证信息
        this.realName = e.result.identificationInfo.realName
        this.sex = e.result.identificationInfo.sex
        this.nation = e.result.identificationInfo.nation
        this.birthday = e.result.identificationInfo.birthday
        this.idNum = e.result.identificationInfo.idNum
        this.address = e.result.identificationInfo.address
        this.expireDate = e.result.identificationInfo.expireDate
        this.cerOrg = e.result.identificationInfo.cerOrg
        this.frontUrl = e.result.identificationInfo.frontUrl
        this.oppositeUrl = e.result.identificationInfo.oppositeUrl
      })

  }
  getLoginData() {
    this.http.getGroupDateGrid('kalanchoe-manager/v1/kalanchoe/backstage/user/' + this.userid + '/logDataGrid?' + 'pageNum=' + this.pageNum + '&pageSize=' + 10
    ).subscribe(e => {
      this.total=e.result.total
      this.list=e.result.list
      this.addIndexList()
    })
  }
  addIndexList(){
    var list = this.list
    var List=list.map((item,index)=>{
      item['index']=(this.pageNum-1)*10+index+1
      return item
    })
    this.data=List
  }
  pageSearch($event){
    this.pageNum=$event
    this.getLoginData()
  }

  showBasic() {
    this.showBasicInm = true;
    this.showCheckInm = false;
    this.showLoginInm = false;
    this.selectedBasic = true;
    this.selectedCheck = false;
    this.selectedLogin = false;
    this.showidentificationInfo = false;
  }
  showCheck() {
    if (this.identificationInfo == null) {
      this.showBasicInm = false
      this.showCheckInm = false;
      this.showLoginInm = false;
      this.selectedBasic = false;
      this.selectedCheck = true;
      this.selectedLogin = false;
      this.showidentificationInfo = true
    }else{
      this.showBasicInm = false;
      this.showCheckInm = true;
      this.showLoginInm = false;
      this.selectedBasic = false;
      this.selectedCheck = true;
      this.selectedLogin = false;
      this.showidentificationInfo = false;
    }
  }
  showLogin() {
    this.showBasicInm = false;
    this.showCheckInm = false;
    this.showLoginInm = true;
    this.selectedBasic = false;
    this.selectedCheck = false;
    this.selectedLogin = true;
    this.showidentificationInfo = false;
  }

}

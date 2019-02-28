import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {
  total = 30
  pageNum = 1
  //查找变量
  findPhone=''
  data = []
  mobile
  //调整modal
  showReconciliation = false
  //调整参数
  radiovalue = '1'
  //调整假数据
  adjugeAccount = ''
  availableMoney = ''
  availableCommissions = ''
  availableBonuses = ''
  selectAccount = '1'
  accountText = ''
  beforeAccount = ''
  afterAccount = ''
  showCheckMoadl = false
  adjugecheckAccount = ''
  selectText='余额账户'
  adjugeReason=''
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
      if(this.route.snapshot.queryParams.userTle){
          this.findPhone=this.route.snapshot.queryParams.userTle
      }
    this.getData()
  }
  getData(){
    this.http.getGroupDateGrid('kalanchoe-manager/v1/account/user/dataGrid?'
    +'pageNum='+this.pageNum
    +'&pageSize=10'
    +'&mobile='+this.findPhone).subscribe(e => {
     this.data=e.result.list
     this.total=e.result.total
    })
  }
  search(){
      this.pageNum=1
    this.getData()
  }
  reset(){
    this.findPhone=''
  }
  //调账
  clickedReconciliation(mobile,availableVacancy) {
    this.mobile=mobile
    this.showReconciliation = true
    this.availableMoney=availableVacancy
  }
  //选择获取账户余额（余额，佣金，奖金）
  getCount(type){
    this.http.getCustomHeaders4('kalanchoe-manager/v1/account/deploy/show?'
    +'mobile='+this.mobile
    +'&type='+type).subscribe(e => {
      if(type=='1'){
        this.availableMoney=e.result.canAccount
      }
      if(type=='2'){
        this.availableCommissions=e.result.canAccount
      }
      if(type=='3'){
        this.availableBonuses=e.result.canAccount
      }
      
    })
  }
  reconciliationCancel() {
    this.showReconciliation = false
    this.clearData()
  }
  reconciliationOk() {
    if(this.adjugeAccount!=''&&this.adjugeReason!=''){
      this.computeAccountText()
      this.computeAccount()
    }
    else{
      this.message.error('金额与事由均不能为空！')
    }
    
    
  }
  //关闭modal 回归默认
  clearData(){
    this.availableMoney=''
    this.availableCommissions=''
    this.availableBonuses=''
    this.selectAccount='1'
    this.selectText='余额账户'
    this.radiovalue='1'
    this.adjugeAccount=''
    this.adjugeReason=''
    this.showCheckMoadl = false
    this.showReconciliation=false
  }
  //判断正负，计算余额
  computeAccount(){
    let adjugeAccount = this.adjugeAccount
    if (this.radiovalue == '1') {
      this.adjugecheckAccount = `+${adjugeAccount}`
      this.afterAccount=(Number(this.beforeAccount)+Number(adjugeAccount)).toString()
      this.showCheckMoadl = true
    }
    if (this.radiovalue == '0') {
      let afterAccount =Number(this.beforeAccount)-Number(adjugeAccount)
      if(afterAccount>=0){
        this.adjugecheckAccount = `-${adjugeAccount}`
        this.afterAccount=(Number(this.beforeAccount)-Number(adjugeAccount)).toString()
        this.showCheckMoadl = true
      }
      else{
          this.message.error('调减金额大于余额总数！')
          return
      }
    }
  }
  //动态显示计算前后的账户金额
  computeAccountText(){
    if (this.selectAccount == '1') {
      if(this.availableMoney==null){
        this.beforeAccount='0'
      }
      else{
        this.beforeAccount = this.availableMoney
      }
      this.selectText='余额账户'
    }
    if (this.selectAccount == '2') {
      if(this.availableCommissions==null){
        this.beforeAccount='0'
      }
      else{
        this.beforeAccount = this.availableCommissions
      }
      this.selectText='佣金账户'
    }
    if (this.selectAccount == '3') {
      if(this.availableBonuses==null){
        this.beforeAccount='0'
      }
      else{
        this.beforeAccount = this.availableBonuses
      }
      this.selectText='奖金账户'
    }
  }
  //提交
  clickedcheckCancel() {
    this.showCheckMoadl = false
  }
  clickedcheckOk() {
    let method
    let type = this.selectAccount
    let account = this.adjugeAccount
    let mobile = this.mobile
    let remark = this.adjugeReason
    if(this.radiovalue=='1'){
      method='add'
    }
    if(this.radiovalue=='0'){
      method='minus'
    }
    this.http.postGroup('kalanchoe-manager/v1/account/deploy',{
      type:type,
      mobile:mobile,
      account:account,
      remark:remark,
      method:method
    }).subscribe(e=>{
      if(e.code==200){
        this.message.success('调账成功')
      }
      if(e.code!=200){
        this.message.error(e.reason+',调账失败')
      }
       this.getData()
       this.clearData()
    })
  }
  pageSearch($event) {
    this.pageNum = $event
    this.getData()
  }
}

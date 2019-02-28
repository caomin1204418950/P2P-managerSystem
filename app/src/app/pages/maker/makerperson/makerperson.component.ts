import { Component, OnInit } from '@angular/core';
import { DateTransformService } from '../../../shared/service/date-transform.service'
import { HttpService } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-makerperson',
  templateUrl: './makerperson.component.html',
  styleUrls: ['./makerperson.component.css']
})
export class MakerpersonComponent implements OnInit {
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;
  displayData = [];
  data = []
  list =[]
  options=[]
  switchValue:Boolean
  findPhone='';
  wantStartTime='';
  wantEndTime='';
  findInviterPhone='';
  findRegisterSource='';
  findGroupName='';
  findStatus='';
  pageNum= 1;

  status
  isVisible=false

  id
  selected=[]
  statusText
  showManyDisableMoadl=false
  showManyAbleMoadl=false
  showGroupCount=true
  showAdjugeGroup=false
  groupId
  choosedGroup
  total
  
//全选
    indeterminate=false
    allChecked=false
  constructor(
    private dateTransform: DateTransformService,
    private http: HttpService,
    private message: NzMessageService,

  ) { }

  //分页查询
  pageSearch($event){
    this.pageNum=$event
    this.getdata()
  }
  getdata() {
    this.http.getGroupDateGrid('kalanchoe-manager/v1/kalanchoe/backstage/userDataGrid?' + 'phone='+this.findPhone + '&registerTimeStart='+this.wantStartTime +
      '&registerTimeEnd='+this.wantEndTime+ '&registerSource='+this.findRegisterSource +
      '&inviterPhone='+this.findInviterPhone +
      '&status='+this.findStatus + '&groupName='+this.findGroupName +
      '&pageNum=' + this.pageNum +
      '&pageSize=' + 10)
      .subscribe(e => {
        this.allChecked=false
        this.list = e.result.list
        this.total = e.result.total
        this.pushSwitchValue()
      })
  }
  pushSwitchValue(){
    this.list.map(item=>{
      if(item.status===1){
        item.switchValue=true
      }
      if(item.status===0){
        item.switchValue=false
        item.check=false
      }
      return
    })
    this.data=this.list
  }

  getGroupInm(){
    this.http.getGroupDateGrid('kalanchoe-manager/v1/kalanchoe/backstage/group').subscribe(e => {
      var list = e.result.map((item) => {
        return { 'groupId': item.id, 'groupName': item.groupName }
      })
      this.options = list
    })
  }

  ngOnInit() {
    this.getdata()
    this.getGroupInm()
  }

  search(){
    this.getdata()
    this.pageNum=1
  }

  reset(){
    this.findPhone='',
    this.wantStartTime='',
    this.startValue=null,
    this.wantEndTime='',
    this.endValue=null,
    this.findRegisterSource='',
    this.findStatus='',
    this.findGroupName=''
  }

  switchChange($event,id){
    this.switchValue=$event
    this.isVisible=true
    this.id=id
    if($event===true){
      this.statusText='你确定要启用此人吗？'
    }
    if($event===false){
      this.statusText='你确定要禁用此人吗？禁用后用户将无法登录APP或平台！'
    }
  }
  // card one
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
    this.wantStartTime = this.dateTransform.transform(date)+' 00:00:00'
  }

  onEndChange(date: Date): void {
    this.endValue = date
    this.wantEndTime = this.dateTransform.transform(date)+' 23:59:59'
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
  }

  handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }

  //card two

  checked($event, id) {
    if($event===true){
      this.selected.push(id)
    }
    if($event===false){
      this.showGroupCount=true
      let selected = this.selected.filter(item=>{
        return item!=id
      })
      this.selected=selected
    }
    if(this.selected.length==this.data.length){
        this.allChecked=true
        this.indeterminate=false
    }
    else if(this.selected.length==0){
        this.allChecked=false
        this.indeterminate=false
    }
    else{
        this.allChecked=false
        this.indeterminate=true
    }
  }
  //全选
  checkAll($event) {
    if($event==true){
        this.allChecked=true
        this.indeterminate=false
    }else{
        this.allChecked=false
        this.indeterminate=false
    }
    if(this.allChecked==true){
         this.selected = this.data.map(item=>{
            item.check=true
            return item.id
        })
    }
    if(this.allChecked==false){
        this.selected = this.data.map(item=>{
            item.check=false
        })
        this.selected=[]
    } 
}
  //调整人员分组
  clickedAdjugeGroup(){
    if(this.selected.length==0){
      this.message.error('请至少选择一个分组！')
    }
    else{
      this.showGroupCount=false
    }
  }
  chooseGroup($event,groupName){
    this.choosedGroup=groupName
    this.groupId=$event.target.value
    this.showAdjugeGroup=true
  }
  AdjugeMoadleOk(){
    this.showGroupCount=true
    this.showAdjugeGroup=false
    this.AdjugeGroup()
    this.selected=[]
  }
  AdjugeMoadleCancel(){
    this.showAdjugeGroup=false
    this.choosedGroup=''
  }
  AdjugeGroup(){
    let groupId = this.groupId
    let selected = this.selected
    this.http.patchGroup(
      'kalanchoe-manager/v1/kalanchoe/backstage/user/group',
      {
        'list': selected,
        'groupId': groupId
      }

    ).subscribe(res => {
      if (res.code == '200') {
        this.getdata();
        this.message.success('分组调整成功')
      }
      else {
        this.message.error('分组调整失败')
      }
      this.showAdjugeGroup=false
    })
  }
  // 批量禁用
  DisableMoadleCancel(){
    this.showManyDisableMoadl=false
  }
  DisableMoadleOk(){
    this.showManyDisableMoadl=false
    this.manyDisabled()
    this.selected=[]
  }
  manyDisabled(){
    let selected =this.selected
    this.http.patchGroup(
      'kalanchoe-manager/v1/kalanchoe/backstage/user'
      , {
        'status': '0',
        'list': selected
      }

    ).subscribe(res => {
      if (res.code == '200') {
        this.getdata();
        this.message.success('禁用成功')
      }
      else {
        this.message.error('禁用失败')
      }
    })

  }
  clickedDisAble(){
    if(this.selected.length==0){
      this.message.error('请至少选择一个分组！')
    }
    else{
      this.showManyDisableMoadl=true
    }
  }

  //批量启用
  clickedAble(){
    if(this.selected.length==0){
      this.message.error('请至少选择一个分组！')
    }
    else{
      this.showManyAbleMoadl=true
    }
  }
  AbleMoadleCancel(){
    this.showManyAbleMoadl=false
  }
  AbleMoadleOk(){
    this.showManyAbleMoadl=false
    this.manyAbled()
    this.selected=[]
  }
  manyAbled(){
    let selected =this.selected
    this.http.patchGroup(
      'kalanchoe-manager/v1/kalanchoe/backstage/user'
      , {
        'status': '1',
        'list': selected
      }

    ).subscribe(res => {
      if (res.code == '200') {
        this.getdata();
        this.message.success('启用成功')
      }
      else {
        this.message.error('启用失败')
      }
    })
  }
  //modal
  handleOk(): void {
    if(this.switchValue===false){
      this.status=0
    }
    if(this.switchValue===true){
      this.status=1
    }
    this.changeStatusData()
    this.isVisible = false;
  }

  changeStatusData(){
    let id = this.id
    let selected = []
    selected.push(id)
    let status = this.status

    this.http.patchGroup(
      'kalanchoe-manager/v1/kalanchoe/backstage/user'
      , {
        'status': status,
        'list': selected
      }

    ).subscribe(res => {
      if (res.code == '200') {
        this.getdata();
        this.message.success('状态改变成功')
      }
      else {
        this.message.error('状态改变失败')
      }
    })

  }
  handleCancel(): void {
    this.getdata()
    this.isVisible = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-makergroup',
  templateUrl: './makergroup.component.html',
  styleUrls: ['./makergroup.component.css']
})
export class MakergroupComponent implements OnInit {
  //查询变量
  findStatus=''
  pageNum=1
  findGroupName=''

  //数据总数
  total
  
  data=[]
  list=[]
  //状态变量
  switchValue:boolean
  status
  groupId
  showSingleSwitch=false

  //批量操作变量
  selected=[]
  showManyDisableMoadl=false
  showManyAbleMoadl=false
  showAddMoadl=false

  //添加分组变量
    groupName=''
    commissionRate:number
    remark=''

  //修改分组变量
  showChangeMoadl=false
  oldGroupName
  oldCommissionRate
  oldRemark
  
  //全选
//   displayData=[]
//   allChecked = false;
  constructor(
    private http: HttpService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.getGroupData()
  }
  getGroupData(){
    this.http.getGroupDateGrid('kalanchoe-manager/v1/kalanchoe/backstage/groupDataGrid?groupName=' + this.findGroupName +
    '&status=' + this.findStatus +
    '&pageNum=' + this.pageNum +
    '&pageSize=' + 10)
    .subscribe(e => {
      console.log(e.result.list,1111)
      this.total=e.result.total
      this.list=e.result.list
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
      }
      return
    })
    this.data=this.list
  }
  search(){
    this.pageNum=1
    this.getGroupData()
  }
  reset(){
    this.findGroupName=''
    this.findStatus=''
  }
  pageSearch($event){
    this.pageNum=$event
    this.getGroupData()
  }
  switchChange($event,id){
    this.groupId=id
    this.switchValue=$event
    this.showSingleSwitch=true
  }
  singleHandleCancel(){
    this.showSingleSwitch=false
    this.getGroupData()
  }
  singleHandleOk(){
    this.showSingleSwitch=false
    if(this.switchValue===false){
      this.status=0
    }
    if(this.switchValue===true){
      this.status=1
    }
    this.changeStatusData()
  }
  changeStatusData(){
    let id = this.groupId
    let selected = []
    selected.push(id)
    let status = this.status

    this.http.patchGroup(
      'kalanchoe-manager/v1/kalanchoe/backstage/group'
      , {
        'status': status,
        'list': selected
      }

    ).subscribe(res => {
      if (res.code == '200') {
        this.getGroupData();
        this.message.success('状态修改成功',{nzDuration: 1500})
      }
      else {
        this.getGroupData()
        this.message.error(res.reason);
      }
    })
  }
  checked($event, id) {
    if($event===true){
      this.selected.push(id)
    }
    if($event===false){
      let selected = this.selected.filter(item=>{
        return item!=id
      })
      this.selected=selected
    }
  }
  clickedDisAble(){
    if(this.selected.length==0){
      this.message.error('请至少选择一个分组！')
    }
    else{
      this.showManyDisableMoadl=true
    }
  }
  manyDisabled(){
    let selected =this.selected
    this.http.patchGroup(
      'kalanchoe-manager/v1/kalanchoe/backstage/group'
      , {
        'status': '0',
        'list': selected
      }

    ).subscribe(res => {
      if (res.code == '200') {
        this.getGroupData();
        this.message.success('禁用成功',{nzDuration: 1500})
      }
      else {
        this.message.error(res.reason);
        this.getGroupData()
      }
    })
  }
  DisableMoadleCancel(){
    this.showManyDisableMoadl=false
  }
  DisableMoadleOk(){
    this.showManyDisableMoadl=false
    this.manyDisabled()
    this.selected=[]
  }

  clickedAble(){
    if(this.selected.length==0){
      this.message.error('请至少选择一个分组！')
    }else{
      this.showManyAbleMoadl=true
    }
  }
  manyAble(){
    let selected = this.selected
    this.http.patchGroup(
      'kalanchoe-manager/v1/kalanchoe/backstage/group'
      , {
        'status': 1,
        'list': selected
      }

    ).subscribe(res => {
      if (res.code == '200') {
        this.getGroupData()
        this.message.success('启用成功',{nzDuration: 1500})
      }
      else {
        this.message.error(res.reason);
        this.getGroupData()
      }
    })
  }
  AbleMoadleOk(){
    this.showManyAbleMoadl=false
    this.manyAble()
    this.selected=[]
  }
  AbleMoadleCancel(){
    this.showManyAbleMoadl=false
  }

  clickedAddGroup(){
    this.showAddMoadl=true
    this.groupName=''
    this.commissionRate=null
    this.remark=''
  }
  AddMoadleOk(){
      console.log(this.commissionRate,333)
    if(this.groupName==''){
      this.message.error('分组名称不能为空')
    }
    if(this.commissionRate==null|| this.commissionRate<=0){
      this.message.error('佣金比例必须大于0')
    }
    if(this.commissionRate!=null&&this.commissionRate>0&&this.groupName!=''){
      this.showAddMoadl=false
      this.addGroup()
    }
  }
  addGroup(){
    this.http.postGroup('kalanchoe-manager/v1/kalanchoe/backstage/group',
    {
      groupName: this.groupName,
      commissionRate: this.commissionRate,
      remark: this.remark
    }).subscribe(res => {
      // console.log(res)
      if (res.code == '200') {  
        console.log('ok')
        this.getGroupData() 
        this.message.success('添加分组成功')     
      }
      else {
        console.log('fail')
        this.message.error('该分组已存在')
      }

    })
  }
  AddMoadleCancel(){
    this.showAddMoadl=false
  }
  clickedChangeGroup(groupName,commissionRate,remark,id){
    this.oldGroupName=groupName
    this.oldCommissionRate=commissionRate
    this.oldRemark=remark
    this.showChangeMoadl=true
    this.groupId=id
    console.log(this.oldGroupName)
  }
  ChangeMoadleCancel(){
    this.showChangeMoadl=false
  }
  ChengeMoadleOk(){
    console.log(this.oldCommissionRate,333)
    
    console.log(this.oldGroupName)
    if(this.oldGroupName==''){
      this.message.error('分组名称不能为空')
    }
    if(this.oldCommissionRate==null|| this.oldCommissionRate<=0){
      this.message.error('佣金比例必须大于0')
    }
    if(this.oldCommissionRate!=null&&this.oldCommissionRate>0&&this.oldGroupName!=''){this.showAddMoadl=false
      this.showChangeMoadl=false
      this.changeGroup()
    }
  }
  changeGroup(){
    this.http.putGroup('kalanchoe-manager/v1/kalanchoe/backstage/group',
      {
        id: this.groupId,
        groupName: this.oldGroupName,
        commissionRate: this.oldCommissionRate,
        remark: this.oldRemark
      }).subscribe(res => {
        console.log(res)
        if (res.code == '200') {
          this.getGroupData()
          this.message.success('修改分组成功')   
        }
        else {
          this.message.error('该分组已存在')
        }

      })
  }
  
  //全选
 
//   checkAll($event) {
//       console.log($event)
//       if($event==true){
          
//            this.selected = this.data.map(item=>{
//               return item.id
//           })
          
//       }
      
//   }
}

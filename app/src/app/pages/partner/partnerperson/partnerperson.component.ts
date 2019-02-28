import { Component, OnInit } from '@angular/core';
import { DateTransformService } from '../../../shared/service/date-transform.service'
import { HttpService } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-partnerperson',
  templateUrl: './partnerperson.component.html',
  styleUrls: ['./partnerperson.component.css']
})
export class PartnerpersonComponent implements OnInit {
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;
  total = 0
  pageNum = 1

  //查询变量
  findPhone=''
  findInviter=''
  wantStartTime=''
  wantEndTime=''
  findLevel=''
  //等级数据
  levelList=[]
  AdjugeLevelModal=false
  data=[
  ]
  //批量移动变量
  levelId
  userId
  selected=[]

  //等级显示变量
  listShow=true

  //全选
  indeterminate=false
  allChecked=false
  list=[]
  constructor(
    private http: HttpService,
    private dateTransform: DateTransformService,
    private message: NzMessageService,

  ) { }

  ngOnInit() {
    this.getData()
    this.getLevel()
  }
  //获取所有等级
  getLevel(){
    this.http.getCustomHeaders4(
      'kalanchoe-manager/v1/kalanchoe/backstage/level'
    ).subscribe(res => {
      this.levelList = res.result

    })
  }
  //获取总数据
  getData(){
    this.http.getCustomHeaders4(
      'kalanchoe-manager/v1/kalanchoe/backstage/partner/userDataGrid?mobile=' + this.findPhone +
      '&checkTimeStart=' + this.wantStartTime +
      '&checkTimeEnd=' + this.wantEndTime +
      '&inviterPhone=' + this.findInviter +
      '&level=' + this.findLevel +
      '&pageNum=' + this.pageNum +
      '&pageSize=' + 10
    ).subscribe(res => {
      this.allChecked=false
      this.total=res.result.total
      this.list=res.result.list
      this.addCheckBox()
    })
  }
  addCheckBox(){
    this.list.map(item=>{
          item.check=false
        return
      })
      this.data=this.list
  }

  search() {
    this.getData()
    this.pageNum=1
  }
  reset() {
    this.findPhone = ''
    this.findInviter=''
    this.findLevel = ''
    this.startValue = null
    this.endValue = null
    this.wantEndTime=''
    this.wantStartTime=''
  }
  pageSearch($event){
    this.pageNum=$event
    this.getData()
  }

  //移动等级
  clickedAdjugeLevel(){
      if(this.selected.length==0){
        this.message.error('请至少选择一项！')
      }
      else{
        this.listShow=!this.listShow
      }
  }
  checkLevel(item){
    this.levelId=item.levelName
    this.AdjugeLevelModal=true
  }
  AdjugeLevelMoadleCancel(){
    this.AdjugeLevelModal=false
  }
  AdjugeLevelMoadleOk(){
    this.AdjugeLevelModal=false
    this.listShow=true
    this.adjugeLevel()
    this.selected=[]
  }
  adjugeLevel(){
    let selected = this.selected
    let levelId = this.levelId
    this.http.patchGroup('kalanchoe-manager/v1/kalanchoe/backstage/partner/user',
    {
      list:selected,
      levelName:levelId
    }).subscribe(res => {
      if(res.code == "200"){
        this.getData()
      }else {
      }
    })
  }
  //批量选中
  checked($event,id){
    if($event===true){
      this.selected.push(id)
    }
    if($event===false){
        this.listShow=!this.listShow
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

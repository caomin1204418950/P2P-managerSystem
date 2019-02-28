import { DateTransformService } from './../../../shared/service/date-transform.service';
import { HttpService } from './../../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http/src/http';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less']
})
export class HelpComponent implements OnInit {

  total
  constructor(
    private http: HttpService,
    private dateTransform: DateTransformService,
    private route: ActivatedRoute,
    private message: NzMessageService

  ) { }
  data = {
    mengbanshow: false,//控制弹窗蒙版的显示隐藏
    formshow: false,//控制form弹窗的显示隐藏
    removeshow: false,//控制删除弹窗的显示隐藏
    add: true,//为真时添加，为假时修改
    addtext: '添加',//弹窗标题
    find: {
      title: '',//问题标题
      pageNum: 1,//当前页码数
      pages: 2,//页码总数
    },
    table: [//表格的数据
      {
        "id": "02e9dd34-bbb2-4ad2-a640-26f6b8279daf",
        "updateDate": "2018-11-27 14:48:39",
        "title": "怎么赚钱?",
        "unsolvedCount": 0,
        "solvedCount": 0,
      }
    ],
    form: {//表单数据，用于生成和修改
      "id": "",
      "title": "",
      "answer": "",
      cansubmit: true,//控制提交按钮是否禁用
    },
  }

  
  keyupHandler(e) {
    this.data.form.answer = e
  }
  addtable(form) {//添加配置项
    this.http.postCustomHeaders(
      '/v1/app/back/help',
      {
        title: form.title,
        answer: form.answer,
      }
    ).subscribe(res => {
      if (res.code == '200') {
       this.message.success('添加成功')
      } else {
        this.message.error('添加失败')
      }
      this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
    })
  }
  removetable(form) {//删除配置项
    this.http.deleteCustomHeaders(
      '/v1/app/back/helps/' + form.id
    ).subscribe(res => {
      if (res.code == '200') {
        this.message.success('删除成功')
      } else {
        this.message.error('删除失败')
      }
      this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
    })
  }
  changetable(form) {//修改配置项
    this.http.putCustomHeaders(
      '/v1/app/back/helps/' + form.id,
      {
        title: form.title,
        answer: form.answer,
      }
    ).subscribe(res => {
      if (res.code == '200') {
       this.message.success('修改成功')
      } else {
        this.message.error('修改失败')
      }
      this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
    })
  }
  gettable(pageNum, find) {//查询配置项
    this.http.getCustomHeaders(
      '/v1/app/back/helpsDataGrid?title=' + find.title +
      '&pageNum=' + pageNum +
      '&pageSize=' + 10
    ).subscribe(res => {
      this.data.table = res.result.list
      this.data.find.pageNum = res.result.pageNum
      this.data.find.pages = res.result.pages
      this.total=res.result.total
    })
  }
  reset() {//重置查询框
    this.data.find.title = '';
  }
  pageSearch($event){
    this.data.find.pageNum=$event
    this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
  }
  formshow(list) {//点击添加或修改按钮，打开添加弹窗
    if (list) {
      this.data.form.title = list.title
      this.data.form.answer = list.answer
      this.data.form.id = list.id
      this.data.add = false;
      this.data.addtext = '修改';
    } else {
      this.data.form = {
        "id": "",
        "title": "",
        'answer': '',
        cansubmit: true,
      }
      this.data.add = true;
      this.data.addtext = '添加';
    }
    this.data.mengbanshow = true;
    this.data.formshow = true;
  }
  submit() {//点击提交按钮，发起添加或修改请求
    if (this.data.form.title && this.data.form.title.replace(/\s+/g,"") !="") {
      if (this.data.form.answer) {
        if (this.data.addtext == '添加') {
          this.addtable(this.data.form)
        }
        if (this.data.addtext == '修改') {
          this.changetable(this.data.form)
        }
        this.hidden()
      } else {
        alert('请填写回答')
      }
    } else {
      alert('请填写标题')
    }
  }
  removeshow(list) {//点击删除按钮，打开删除弹窗
    this.data.mengbanshow = true;
    this.data.removeshow = true;
    this.data.form.id = list.id
  }
  remove() {//点击删除弹窗的确认按钮，发起删除请求
    this.removetable(this.data.form)
    this.hidden()
  }
  hidden() {//点击取消按钮，关闭所有弹窗
    this.data.mengbanshow = false;
    this.data.formshow = false;
    this.data.removeshow = false;
    this.data.form = {//关闭弹窗时把弹窗清除
      "id": "",
      "title": "",
      "answer": "",
      cansubmit: true,
    }
  }
  changePage(e) {//切换页码
    this.gettable(e, this.data.find);
  }
  //生命周期函数
  ngOnInit() {
    this.gettable(this.data.find.pageNum, this.data.find)
  }
  ngDoCheck() {
    if (this.data.form.title) {//检测标题是否填写
      if (this.data.form.answer) {//检测回答是否填写
        this.data.form.cansubmit = false;
      } else {
        this.data.form.cansubmit = true;
      }
    } else {
      this.data.form.cansubmit = true;
    }
  }
}

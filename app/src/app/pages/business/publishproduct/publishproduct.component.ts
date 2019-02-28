import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-publishproduct',
  templateUrl: './publishproduct.component.html',
  styleUrls: ['./publishproduct.component.css']
})
export class PublishproductComponent implements OnInit {

  //查询变量
  findNumber=''
  findStatus=''
  pageNum=1
  id
  data=[]
  total=0
  constructor(
    private http:HttpService,
    private message: NzMessageService,

  ) { }

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.http.getCustomHeaders(
      '/v1/app/back/productsDataGrid?number=' + this.findNumber +
      '&status=' + this.findStatus +
      '&pageNum=' + this.pageNum +
      '&pageSize=' + 10
    ).subscribe(res => {
      this.data=res.result.list
      this.total=res.result.total
    })
  }
  fromsale(data){
    this.http.patchCustomHeaders(
        '/v1/app/back/products/' + data.productId,//调试7300接口
        {
          id:data.productId,
          status: 3,
          comments: '',
        }
      ).subscribe(e=>{
          if(e.code==200){
            this.message.success('下架成功')
            this.getData()
          }
          else{
            this.message.error('下架失败')
          }
      })
  }
  search(){
    this.getData()
  }
  reset(){
    this.findStatus=''
    this.findNumber=''
  }
  pageSearch($event){
    this.pageNum=$event
    this.getData()
  }
}

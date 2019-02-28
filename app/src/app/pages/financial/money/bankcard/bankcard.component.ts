import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../shared/service/http-serve.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-bankcard',
  templateUrl: './bankcard.component.html',
  styleUrls: ['./bankcard.component.css']
})
export class BankcardComponent implements OnInit {

  pageNum='1'
  total='30'
  mobile=''
  data=[]
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.mobile=this.route.snapshot.queryParams.mobile

    this.getData()
  }
  getData(){
    this.http.getGroupDateGrid('kalanchoe-manager/v1/bank/user/cards?'
    +'pageNum='+this.pageNum
    +'&pageSize=10'
    +'&mobile='+this.mobile).subscribe(e => {
      this.total=e.result.list.total
     this.data=e.result.list.list
    })
  }
  pageSearch($event) {
    this.pageNum = $event
  }
}

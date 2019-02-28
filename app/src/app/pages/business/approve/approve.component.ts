import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../shared/service/http-serve.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  //查询变量
  findRegMobile=''
  findMobile=''
  findEtpName=''
  findlegalName=''
  findCreditCode=''
  findIdCardNum=''
  pageNum=1

  data=[]
  total=0
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    // this.findRegMobile=this.route.snapshot.queryParams.findPhone
    let adjugePhone=this.route.snapshot.queryParams.findPhone
    if(adjugePhone==undefined){
      this.getData()
    }
    else{
      this.findRegMobile=adjugePhone
    this.getData()

    }
  }
  getData(){
    this.http.getCustomHeaders(
      "/v1/app/back/etpCersGrid?regMobile="
      +this.findRegMobile
      +"&mobile="+this.findMobile
      +"&etpName="+this.findEtpName
      +"&legalName=" +this.findlegalName
      +"&creditCode="+this.findCreditCode
      +"&idCardNum="+this.findIdCardNum
      // +"&code="+(this.approveSearch.code?this.approveSearch.code:'')
      +"&status=1"
      +'&pageNum='+this.pageNum+'&pageSize=10'
    ).subscribe(res=>{
      this.data=res.result.list;
      this.total=res.result.total
    });
  } 
  search(){
    this.getData()
  }
  reset(){
    this.findRegMobile=''
    this.findMobile=''
    this.findEtpName=''
    this.findlegalName=''
    this.findCreditCode=''
    this.findIdCardNum=''
  }
  pageSearch($event){
    this.pageNum=$event
    this.getData()
  }
}

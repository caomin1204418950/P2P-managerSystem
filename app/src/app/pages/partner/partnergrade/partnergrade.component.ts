import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from './../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-partnergrade',
  templateUrl: './partnergrade.component.html',
  styleUrls: ['./partnergrade.component.css']
})
export class PartnergradeComponent implements OnInit {
  rows = []
  checkId

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private message: NzMessageService,

  ) { }

  ngOnInit() {
    this.getMes()
  }
  getMes (){
    this.http.getCustomHeaders4(
      'kalanchoe-manager/v1/kalanchoe/backstage/level'
    ).subscribe(res => {
      this.rows = res.result
    })
  }
  edit (id) {
    this.checkId = id;
  }
  delete (num) {
    let levelId = this.rows[num].id
    this.http.deleteLevel('kalanchoe-manager/v1/kalanchoe/backstage/delLevelById/'+levelId).subscribe(e=>{
        if(e.code==200){
            this.rows.splice(num,1)
            this.getMes()
            this.message.success('等级删除成功')
        }
        else{
            this.message.error(e.reason)
        }
    })
  }
  save (id){
    this.checkId = null;
    this.update()
  }
  update (){
    this.http.postGroup(
      'kalanchoe-manager/v1/kalanchoe/backstage/level',this.rows
    ).subscribe(res => {
      if(res.code == "200"){
        this.getMes()
      }else {
        this.message.error(res.reason)
      }
      
    })
  }
  add (){
    this.checkId = '';
    this.rows.push({
      id: '',
      appUserId: 0,
      levelName: 0,
      rebate: 0,
      updateCondition: 0,
      nextLevelId: (this.rows.length+2),
      isDefault:  (this.rows.length+1)
    })
  }
  
}


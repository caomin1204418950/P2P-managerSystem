import { DateTransformService } from './../../../shared/service/date-transform.service';
import { HttpService } from './../../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.less', './form.less']
})
export class LookComponent implements OnInit {

  data = {
    url: ['业务管理', '产品发布管理', '查看产品'],//导航路径
    id: 12345,//产品对应的id
    state: 'look',//页面状态（查看还是审批）
    examine: {//发布审核数据
      id: '',
      status: '2',//审核结果
      comments: ""
    },
    product: {// 产品信息数据
      name: "",
      number: "",
      minTerm: 1,
      maxTerm: 1,
      minAmount: 11,
      maxAmount: 11,
      minRate: 11,
      maxRate: 11,
      status: 0,
      comments: null
    },
    group: [// 表单配置数据
      {
        groupSeq: 1,
        groupName: "公司信息",//分组名称
        groupShow: 1,//是否分页显示此分组
        formControlList: [
          {
            id: "54cade3f-14b3-48f8-95eb-c3fdb7ff2e60",
            createDate: "2018-11-29 11:12:40",
            updateDate: "2018-11-29 11:12:40",
            formId: "0f2ef272-e95a-4dba-a868-f57639d4dd61",
            groupName: "公司信息",
            groupSeq: 1,
            groupShow: 1,
            controlName: "银行贷款信用担保",//字段名称
            controlKey: "bankGuarante",//业务主键
            controlSeq: 1,
            type: "number",//字段类型
            dataSource: "productType",//数据源
            placeInfo: "请填非关联方提供担保企业名，无则填“0”",//提示信息
            require: 1,//是否必填
            dataSourceName: "产品类型",
            typeName: "数字"
          }
        ]
      },
    ],
    applyCondition: [// 申请条件数据
      {
        name: "是否仅白名单用户可申请",
        checked: 1
      },
      {
        name: "允许有未结清贷款时继续申请",
        checked: 0
      },
      {
        name: "校验企业平台贷款金额是否超过100万",
        checked: 1
      }
    ]
  }
  constructor(
    private http: HttpService,
    private dateTransform: DateTransformService,
    private router: Router,
    private route: ActivatedRoute, ) { }
  getinfor() {//查看产品信息
    this.http.getCustomHeaders(
      '/v1/app/back/products/' + this.data.id//调试7300接口
    ).subscribe(res => {
      this.data.product = res.result.product
      this.data.applyCondition = res.result.applyCondition
      this.data.group = res.result.group
      // this.data.product=res.result.product
    })
  }
  back() {
    history.back();
  }
  submit() {
    if (this.data.examine.status) {
      this.http.patchCustomHeaders(
        '/v1/app/back/products/' + this.data.id,//点击审批通过
        this.data.examine
      ).subscribe(res => {
        this.router.navigate(['/app/business/publishproduct']);
      })
    } else {
      alert('请选择审核结果')
    }

  }
  //生命周期函数
  ngOnInit() {
    let that = this;
    that.route.params.subscribe(function (data) {
      that.data.id = data.id

      that.data.examine.id = data.id
      that.data.state = data.state
      if (data.state == "look") {
        that.data.url = ['业务管理', '产品发布管理', '查看产品']
      } else {
        that.data.url = ['业务管理', '产品发布管理', '发布审核']
      }
    })
    that.getinfor()
  }
}

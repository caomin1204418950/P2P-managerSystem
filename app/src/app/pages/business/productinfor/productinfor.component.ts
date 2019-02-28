import { DateTransformService } from '../../../shared/service/date-transform.service';
import { HttpService } from '../../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productinfor',
  templateUrl: './productinfor.component.html',
  styleUrls: ['./productinfor.component.less']
})
export class ProductinforComponent implements OnInit {
  id = '';
  repayMethodName = [1, 1];//支持还款方式
  productTypeName = '';//产品类型
  interestStartTimeName = '';//计息开始时间
  paymentMethodName = '';//服务费支付方式
  data = {
    "product": {
      "id": "d42d193d-1205-44b0-af79-26bbdc31c2ee",
      "name": "W测试",
      "number": "1223456",
      "minTerm": 1,
      "maxTerm": 2,
      "minAmount": 1.0,
      "maxAmount": 2.0,
      "minRate": 1.0,
      "maxRate": 2.0,
      "repayMethod": ",monthlyInterestPayment,equalInteres ,averageCapitalPlusInterest",
      "productType": "guaranteeClass",
      "interestStartTime": "theSameDay",
      "servicePaymentMethod": "payOnSchedule",
      "status": 1,
      "createDate": "2018-12-05 17:59:50",
      "updateDate": "2018-12-05 17:59:50",
      "remark": "描述",
      "productIntroduction": "<p>111</p>\n",
      "repayMethodShow": [
        { "code": "monthlyInterestPayment", "name": "按月付息，到期还本", "checked": 1 },
        { "code": "equalInteres ", "name": "等本等息", "checked": 1 },
        { "code": "averageCapitalPlusInterest", "name": "等额本息", "checked": 1 },
        { "code": "averageCapital", "name": "等额本金", "checked": 0 },
        { "code": "interestFirstThenCost", "name": "先息后本", "checked": 0 }
      ],
      "productTypeShow": [
        { "code": "creditClass", "name": "信用类", "checked": 0 },
        { "code": "guaranteeClass", "name": "保证类", "checked": 1 },
        { "code": "mortgageClass", "name": "抵押类", "checked": 0 }
      ],
      "interestStartTimeShow": [
        {
          "code": "theSameDay",
          "name": "放款日当天",
          "checked": 1
        },
        {
          "code": "theNextDay",
          "name": "放款后的第二天",
          "checked": 0
        }
      ],
      "paymentMethodShow": [
        {
          "code": "payOnSchedule",
          "name": "按期支付", "checked": 1
        },
        {
          "code": "preLendingDeduction",
          "name": "贷前扣除", "checked": 0
        },
        {
          "code": "payAfterLoan",
          "name": "贷后支付", "checked": 0
        }
      ]
    },
    "material": [
      {
        "id": "d70db0aa-eaf4-4c96-93b4-3ada04fb3db9",
        "seq": 1,
        "name": "111",
        "value": "<p>11</p>\n",
        "productId": "d42d193d-1205-44b0-af79-26bbdc31c2ee",
        "createTime": "2018-12-05 17:59:50",
        "updateTime": "2018-12-05 17:59:50"
      }
    ],
    "interestConfig": [
      {
        "id": "0a680056-6dbf-44e0-bec2-ea778e8ad199",
        "productId": "d42d193d-1205-44b0-af79-26bbdc31c2ee",
        "spel": "无",
        "rate": "1",
        "createDate": "2018-12-05 17:59:50",
        "updateDate": "2018-12-05 17:59:50",
        "seq": 1
      }
    ],
    "serviceConfig": [
      {
        "id": "e4acd102-dc05-4699-9579-1a924c6ad0df",
        "productId": "d42d193d-1205-44b0-af79-26bbdc31c2ee",
        "spel": "无",
        "type": 1,
        "rate": "1",
        "createDate": "2018-12-05 17:59:50",
        "updateDate": "2018-12-05 17:59:50",
        "seq": 1
      }
    ],
    "bondConfig": [
      {
        "type": 1, "id": "81a9c4c8-7709-4fa5-a1ca-36f382fc8aa2",
        "productId": "d42d193d-1205-44b0-af79-26bbdc31c2ee",
        "spel": "111",
        "rate": "1",
        "createDate": "2018-12-05 17:59:50",
        "updateDate": "2018-12-05 17:59:50", "seq": 1
      }
    ]

  }

  res = {//产品信息
    "product": {
      "id": "ea7d1912-1735-461d-af65-71caed5126dd",
      "name": "111",
      "number": "11",
      "minTerm": 1,
      "maxTerm": 1,
      "minAmount": 11,
      "maxAmount": 11,
      "minRate": 11,
      "maxRate": 11,
      "repayMethod": "equalInteres,averageCapital",
      "productType": "creditClass",
      "interestStartTime": "theSameDay",
      "servicePaymentMethod": "payAfterLoan",
      "status": 1,
      "createDate": "2018-11-26 18:03:13",
      "updateDate": "2018-11-26 18:29:20",
      "remark": "11",
      "productIntroduction": "11",
      "repayMethodName": "等本等息（按月还款),等额本金（按月还款）",
      "productTypeName": "信用类",
      "interestStartTimeName": "放款日当天",
      "servicePaymentMethodName": "贷后支付"
    },
    "material": [
      {
        "id": "9b580c34-a314-4909-b762-4218d45baec9",
        "seq": 1,
        "name": "111",
        "value": "<div style='color:red'>产品资料</div>",
        "productId": "ea7d1912-1735-461d-af65-71caed5126dd",
        "createTime": "2018-11-26 18:29:20",
        "updateTime": "2018-11-26 18:29:20"
      },
      {
        "id": "5d65700e-af82-44e2-b3d0-a9d554e3cfdc",
        "seq": 2,
        "name": "11",
        "value": "111",
        "productId": "ea7d1912-1735-461d-af65-71caed5126dd",
        "createTime": "2018-11-26 18:29:20",
        "updateTime": "2018-11-26 18:29:20"
      }
    ],
    "interestConfig": [
      {
        "id": "55923cb2-2d7e-4ffe-bb6b-3143f049a236",
        "productId": "ea7d1912-1735-461d-af65-71caed5126dd",
        "spel": "1 >1 1 1 <3",
        "rate": "1.1%",
        "createDate": "2018-11-26 18:29:20",
        "updateDate": "2018-11-26 18:29:20",
        "seq": 1
      },
      {
        "id": "21034761-041f-404c-8c98-7dd2b6a2db79",
        "productId": "ea7d1912-1735-461d-af65-71caed5126dd",
        "spel": "1 > 4 and 1 <5 or 1 !=500000",
        "rate": "2.5%",
        "createDate": "2018-11-26 18:29:20",
        "updateDate": "2018-11-26 18:29:20",
        "seq": 2
      }
    ],
    "serviceConfig": [
      {
        "id": "fec72244-c0f3-4f89-a79b-59f9f17624ac",
        "productId": "ea7d1912-1735-461d-af65-71caed5126dd",
        "spel": "Amount >11 and Amount <=11",
        "type": 1,
        "rate": "1.1%",
        "createDate": "2018-11-26 18:29:20",
        "updateDate": "2018-11-26 18:29:20",
        "seq": 1
      },
      {
        "id": "17e97b7c-3b85-41f4-96e6-3b65aa839141",
        "productId": "ea7d1912-1735-461d-af65-71caed5126dd",
        "spel": "Amount >1111 and Amount <=111",
        "type": 1,
        "rate": "6%",
        "createDate": "2018-11-26 18:29:20",
        "updateDate": "2018-11-26 18:29:20",
        "seq": 2
      }
    ],
    "bondConfig": [
      {
        "type": 1,
        "id": "1f5a6e54-169b-412a-82dc-ec0a5726c51a",
        "productId": "ea7d1912-1735-461d-af65-71caed5126dd",
        "spel": "Month >11 and Month <11",
        "rate": "1.1%",
        "createDate": "2018-11-26 18:29:20",
        "updateDate": "2018-11-26 18:29:20",
        "seq": 1
      },
      {
        "type": 1,
        "id": "e1444b51-db42-433d-b22c-0bd2c51a7e15",
        "productId": "ea7d1912-1735-461d-af65-71caed5126dd",
        "spel": "Month > 1 and Month <1 or Amount !=111",
        "rate": "1.1%",
        "createDate": "2018-11-26 18:29:20",
        "updateDate": "2018-11-26 18:29:20",
        "seq": 2
      }
    ]
  }
  constructor(
    private http: HttpService,
    private dateTransform: DateTransformService,
    private router: Router,
    private route: ActivatedRoute, ) { }

  foreach(that) {
    that.repayMethodName.length = 0;
    that.productTypeName = '';
    that.interestStartTimeName = '';
    that.paymentMethodName = '';
    for (let i = 0; i < that.data.product.repayMethodShow.length; i++) {
      if (that.data.product.repayMethodShow[i].checked == 1) {
        that.repayMethodName.push(that.data.product.repayMethodShow[i].name)
      }
    }
    for (let i = 0; i < that.data.product.productTypeShow.length; i++) {
      if (that.data.product.productTypeShow[i].checked == 1) {
        that.productTypeName = that.data.product.productTypeShow[i].name
      }
    }
    for (let i = 0; i < that.data.product.interestStartTimeShow.length; i++) {
      if (that.data.product.interestStartTimeShow[i].checked == 1) {
        that.interestStartTimeName = that.data.product.interestStartTimeShow[i].name
      }
    }
    for (let i = 0; i < that.data.product.paymentMethodShow.length; i++) {
      if (that.data.product.paymentMethodShow[i].checked == 1) {
        that.paymentMethodName = that.data.product.paymentMethodShow[i].name
      }
    }
  }

  // getinfor(that) {//获取产品信息
  //   this.http.getCustomHeaders2(
  //     'http://192.168.111.216:8040/peak-resource/v1/resource/products/' + this.id
  //   ).subscribe(res => {
  //     console.log(res);
  //     this.data = res.result
  //     that.foreach(that);
  //   })
  // }
  getinfor(that) {//获取产品信息
    that.http.getCustomHeaders3(
      'kalanchoe-sys/v1/resource/products/' + that.id//调试7300接口
    ).subscribe(res => {
      that.data = res.result
      that.foreach(that);
    })
  }
  back() {
    history.back();
  }
  //生命周期函数
  ngOnInit() {
    let that = this;
    that.route.params.subscribe(function (data) {
      that.id = data.id
    })
    that.getinfor(that)
  }
}

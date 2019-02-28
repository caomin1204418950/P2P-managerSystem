import { HttpService } from './../../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { NzMessageService } from 'ng-zorro-antd';

// import { runInThisContext } from 'vm';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit {
    constructor(
        private http: HttpService,
        private message: NzMessageService

    ) { }
    data = {
        mengbanshow: false,//控制弹窗蒙版的显示隐藏
        formshow: false,//控制form弹窗的显示隐藏
        removeshow: false,//控制删除弹窗的显示隐藏
        imgshow: false,//查看放大的banner图
        imgurl: '',//查看放大的banner图的url
        add: true,//为真时添加，为假时修改
        addtext: '添加',//弹窗标题
        find: {
            title: '',//标题
            status: '',//状态
            pageNum: 1,//当前页码数
            pages: 2,
            code: ''//页码总数
        },
        table: [//表格的数据
            {
                "id": "93cd3d5b-9e26-44d8-a2cf-9507343323a8",
                "title": "标题",
                "mediaUrl": "",
                'detail': '详情信息',
                "status": 0,//状态
                "updateDate": "2018-11-27 16:25:52",
                "switchValue": true,
                sort: '',//排序
            }
        ],
        form: {//表单数据，用于生成和修改
            "id": "",
            "title": "",
            "mediaUrl": "",
            'detail': '',
            "status": 1,
            "code": '',
            sort: '',//排序
            cansubmit: true,//控制提交按钮是否禁用
        },
    }

    list = []
    chooseSort = ""
    showSingleSwitch = false
    groupId
    switchValue
    statusText
    status
    total
    groupList = []
    keyupHandler(e) {//富文本内容导出
        this.data.form.detail = e
    }

    addtable(form) {//添加配置项
        this.http.postCustomHeaders(
            '/v1/app/back/banner',
            {
                title: form.title,
                mediaUrl: form.mediaUrl,
                detail: form.detail,
                status: form.status,
                sort: form.sort,
                bannerGroup: form.code
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
            '/v1/app/back/banners/' + form.id
        ).subscribe(res => {
            if (res.code == '200') {
                this.message.success('删除成功')
            } else {
                this.message.error('删除失败')
            }
            this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
        })
    }
    changetable(form) {//修改banner图
        this.http.putCustomHeaders(
            '/v1/app/back/banners/' + form.id,
            {
                title: form.title,
                mediaUrl: form.mediaUrl,
                detail: form.detail,
                status: form.status,
                sort: form.sort,
                bannerGroup: form.code
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
            '/v1/app/back/bannersDataGrid?title=' + find.title +
            '&status=' + find.status +
            '&bannerGroup=' + find.code +
            '&pageNum=' + pageNum +
            '&pageSize=' + 10
        ).subscribe(res => {
            this.list = res.result.list
            this.total = res.result.total
            this.pushSwitchValue()
            this.data.find.pageNum = res.result.pageNum
            this.data.find.pages = res.result.pages
        })
    }
    pushSwitchValue() {
        this.list.map(item => {
            if (item.status === 1) {
                item.switchValue = true
            }
            if (item.status === 0) {
                item.switchValue = false
            }
            return
        })
        this.data.table = this.list
    }
    reset() {//重置查询框
        this.data.find.title = '';
        this.data.find.status = '';
        this.data.find.code = ''
    }
    pageSearch($event) {
        this.data.find.pageNum = $event
        this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
    }
    uploader: FileUploader = new FileUploader({
        url: "/upload",
        method: "post",
        itemAlias: "file",
        autoUpload: false,
        // formData: [//参数设置，ts报错
        //   {
        //     loginId: "123"
        //   }
        // ]
    });
    selectedFileOnChanged(e, list) {//file框文件上传
        this.uploader.queue[0].upload();
        this.uploader.queue[0].onSuccess = (response, status, headers) => {
            this.uploader.clearQueue();//清除文件
            if (status == 200) {
                list.mediaUrl = JSON.parse(response).location
                this.message.success('上传成功')
            } else {
                this.message.error('上传失败')
            }
        }
    };

    formshow(list) {//点击添加或修改按钮，打开添加弹窗
        if (list) {
            this.data.form.title = list.title
            this.data.form.mediaUrl = list.mediaUrl
            this.data.form.detail = list.detail
            this.data.form.status = list.status
            this.data.form.id = list.id
            this.data.form.sort = list.sort
            this.data.form.code = list.bannerGroup
            this.data.add = false;
            this.data.addtext = '修改';
            this.chooseSort = list.sort;
        } else {
            this.data.form = {
                "id": "",
                "title": "",
                "mediaUrl": "",
                'detail': '',
                "status": 1,
                "code": '全部分组',
                sort: '',//排序
                cansubmit: true,//控制提交按钮是否禁用
            }
            this.data.add = true;
            this.data.addtext = '添加';
        }
        this.data.mengbanshow = true;
        this.data.formshow = true;
    }
    submit() {//点击提交按钮，发起添加或修改请求
        if (this.data.form.title) {
            if (this.data.form.detail) {
                if (this.data.form.sort) {
                    if (Number(this.data.form.sort) < 0) {
                        alert('排序不能为负数')
                    } else {
                        if (this.data.addtext == '添加') {
                            this.http.getCustomHeaders(
                                '/v1/app/back/banner/sort?sort=' + this.data.form.sort).subscribe(res => {
                                    if (res.result == 0) {
                                        this.addtable(this.data.form);
                                        this.hidden()
                                    } else {
                                        alert("排序不能重复")
                                    }
                                })
                        }
                        if (this.data.addtext == '修改') {
                            if (this.chooseSort == this.data.form.sort) {
                                this.changetable(this.data.form);
                                this.hidden()
                            } else {
                                this.http.getCustomHeaders(
                                    '/v1/app/back/banner/sort?sort=' + this.data.form.sort).subscribe(res => {
                                        if (res.result == 0) {
                                            this.changetable(this.data.form);
                                            this.hidden()
                                        } else {
                                            alert("排序不能重复")
                                        }
                                    })
                            }
                        }
                    }
                } else {
                    alert('请填写排序')
                }
            } else {
                alert('请填写详情')
            }
        } else {
            alert('请填写标题')
        }
    }

    switchChange($event, id) {
        this.groupId = id
        this.switchValue = $event
        this.showSingleSwitch = true
        if ($event == true) {
            this.statusText = '你确定要启用此人吗？'
        }
        if ($event == false) {
            this.statusText = '你确定要禁用此人吗？'
        }
    }
    singleHandleCancel() {
        this.showSingleSwitch = false
        this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
    }
    singleHandleOk() {
        this.showSingleSwitch = false
        if (this.switchValue === false) {
            this.status = 0
        }
        if (this.switchValue === true) {
            this.status = 1
        }
        this.changeStatusData()
    }
    changeStatusData() {
        let status = {}
        status['status'] = this.status
        this.http.patchCustomHeaders("/v1/app/back/banners/" + this.groupId, status)
            .subscribe(res => {
                if (res.code == '200') {
                    this.message.success('状态修改成功')
                } else {
                    this.message.error('状态修改失败')
                }
                this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
            })
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
    imgshow(url) {
        this.data.imgurl = url
        this.data.mengbanshow = true;
        this.data.imgshow = true
    }
    hidden() {//点击取消按钮，关闭所有弹窗
        this.data.mengbanshow = false;
        this.data.formshow = false;
        this.data.removeshow = false;
        this.data.imgshow = false;
        this.data.form = {//关闭弹窗时把弹窗清除
            "id": "",
            "title": "",
            "mediaUrl": "",
            'detail': '',
            "status": 1,
            "code": '',
            sort: '',//排序
            cansubmit: true,//控制提交按钮是否禁用
        }
    }
    changePage(e) {//切换页码
        this.gettable(e, this.data.find);
    }
    //生命周期函数
    ngOnInit() {
        this.gettable(this.data.find.pageNum, this.data.find)
        this.getGroupData()
    }
    getGroupData() {
        let bannerGroup
        this.http.getGroupDateGrid('guest-manage/v1/app/back/find/group?bannerGroup=bannerGroup').subscribe(e => {
            this.groupList = e.result
        })
    }
    ngDoCheck() {
        if (this.data.form.title) {//检测标题是否填写
            if (this.data.form.mediaUrl) {//检测图片路径是否填写
                if (this.data.form.detail) {//检测描述是否填写
                    if (this.data.form.sort) {//检测排序是否填写
                        this.data.form.cansubmit = false
                    } else {
                        this.data.form.cansubmit = true
                    }
                } else {
                    this.data.form.cansubmit = true
                }
            } else {
                this.data.form.cansubmit = true
            }
        } else {
            this.data.form.cansubmit = true
        }
    }
}

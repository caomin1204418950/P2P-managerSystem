import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpService } from '../../../../shared/service/http-serve.service';
import { ActivatedRoute, Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-articlepublish',
  templateUrl: './articlepublish.component.html',
  styleUrls: ['./articlepublish.component.scss']
})
export class ArticlepublishComponent implements OnInit {
  form: FormGroup
	items
	typeList=[]
	operate
	defaultImgUrl = 'assets/images/default.jpg'
	// ready 待上传  uploading 上传中  uploaded 上传成功
	upload = 'ready'
	uploadMsg = ''
	imgBase = {
		file: ''
	}
	articleMes = {
		createDate: '',
		articleId: '',
		id: '',
		status: null,
		// taskKey: '',
		// updateDate: '',
		// releaseDate: '',
		// shareNumber: '',
		// wxPageItemId: ''
	}
	time = {
		days: 0,
		hours: [],
		minutes: [],
		time: new Date(),
		selectedHour: '00',
		selectedMinute: '00',
		selectedDay: 0,
		timeString: ''
	}
    id
    pageNum
	showTimePublish=false
  constructor(
		private http: HttpService,
		private route: ActivatedRoute,
    private message: NzMessageService,
    private router: Router
		

	) {
    this.items = new Items()

		const title = new FormControl()
		const originResource = new FormControl()
		const read = new FormControl('', Validators.pattern(/^[0-9]\d{0,100}$/))
		const favorite = new FormControl('', Validators.pattern(/^[0-9]\d{0,100}$/))
		const picture = new FormControl()
		const type = new FormControl()

		this.form = new FormGroup({
			title: title,
			originResource: originResource,
			read: read,
			favorite: favorite,
			picture: picture,
			type: type
		})
   }

  ngOnInit() {
      this.items.picture=''
      this.items.tags=[]
		this.id = this.route.snapshot.queryParams.id
		this.pageNum = this.route.snapshot.queryParams.pageNum
		if(this.route.snapshot.queryParams.id){
			this.getMessage(this.route.snapshot.queryParams.id)
		}else {
			this.items.tags = []
			this.items.picture = ''
			this.operate = 0
		}
		this.getTypeList()
  }

	getMessage(id){
		let params = {
			id: id
		}
		this.http.getGroupDateGrid('kalanchoe-manager/v1/phosphor/backstage/articles/'+params.id).subscribe((res) => {
			this.operate = 1
			this.items.content = res.result.article.content
			this.articleMes.createDate = res.result.article.createDate
			this.articleMes.articleId = res.result.article.id
			this.articleMes.id = res.result.articleDetail.id
			this.articleMes.status = res.result.articleDetail.status
			// this.articleMes.taskKey = res.article.taskKey
			// this.articleMes.updateDate = res.article.updateDate
			// this.articleMes.releaseDate = res.articleDetail.releaseDate
			// this.articleMes.shareNumber = res.articleDetail.shareNumber
			// this.articleMes.wxPageItemId = res.articleDetail.wxPageItemId
			this.items.originResource = res.result.article.source
			this.items.title = res.result.article.title
			this.items.type = res.result.article.type
			this.items.tags = res.result.articleTag.map(item => {
				return item.tag
			})
			if(res.result.articleDetail.readNumber==null){
				this.items.read='0'
			}
			else{
			this.items.read = res.result.articleDetail.readNumber				
			}
			if(res.result.articleDetail.collectNumber==null){
				this.items.favorite='0'
			}
			else{
				this.items.favorite = res.result.articleDetail.collectNumber
			}
			this.items.picture = res.result.articleDetail.picture
			this.defaultImgUrl = res.result.articleDetail.picture
		})
	}
	onSubmit(type) {
        let length=this.items.tags.length        
		if(type != 0){
			if(this.items.picture == "" || !this.items.picture){
				this.message.error('请上传封面图片')
				return false;
			}
			if(this.items.content == "" || !this.items.content){
                this.message.error('请填入文章内容')
				return false;
            }
            if(Object.prototype.toString.call(this.items.tags[length-1])!=="[object Array]"){
                this.message.error('请填入文章标签')
                return false
            }
		}
		if(this.route.snapshot.queryParams.id && type == 0){
			type = -1;
		}
		let articleTag = this.items.tags[length-1].map(item => {
			if(item.tagId){
				return {
					tagId: item.tagId,
					articleId: item.articleId,
					tag: item.tag
				}
			}else {
				return {
					tagId: "",
					articleId: "",
					tag: item
				}
			}
		})
		let form = {
				quartzTime: type == 2 ? this.time.timeString + ":00" : '',
				operate: this.operate,
				article: {
					id: this.articleMes.articleId,
					title: this.items.title,
					content: this.items.content,
					type: this.items.type,
					source: this.items.originResource
				},
				articleDetail: {
					id: this.articleMes.id,
					articleId: this.articleMes.articleId,
					status: type == -1 ? this.articleMes.status : type,
					picture: this.items.picture,
					readNumber: this.items.read,
					shareNumber: "",
					wxPageItemId: "",
					releaseDate: "",
					collectNumber: this.items.favorite
				},
				articleTag: articleTag
			}
		this.http.putGroup('kalanchoe-manager/v1/phosphor/backstage/articles',form).subscribe((res) => {
			if(res){
				this.router.navigateByUrl("app/system/articleupload?pageNum="+this.pageNum)
			}
		})
	}
	getTime(time = new Date()) {
		this.showTimePublish=true
		time.setMinutes(time.getMinutes() + 5)
		let minutes = time.getMinutes()
		let hours = time.getHours()
		this.time.minutes = this.getArrSplitNumber(minutes, 59)
		this.time.hours = this.getArrSplitNumber(hours, 23)
		this.time.time = time
		this.time.selectedHour = this.time.hours[0]
		this.time.selectedMinute = this.time.minutes[0]
		this.time.selectedDay = this.time.time.getDate()
		this.time.timeString = Util.formatTime('yyyy-MM-dd hh:mm', time)
	}
	getArrSplitNumber(startNum, endNum) {
		let arr = []
		while (endNum >= startNum) {
			let newNum = startNum
			if (newNum < 10) newNum = '0' + newNum
			arr.push(newNum)
			startNum++
		}
		return arr
	}
	timeChange(e, type) {
		let value = parseInt(e.target.value)
		let minute = parseInt(this.time.selectedMinute)
		let hour = parseInt(this.time.selectedHour)
		switch (type) {
			case 'day':
				this.time.days = value
				this.time.time.setDate(this.time.selectedDay + value)
				if (value === 1) {
					this.time.minutes = this.getArrSplitNumber(0, 59)
					this.time.hours = this.getArrSplitNumber(0, 23)
				} else if (value === 2) {
					this.time.minutes = this.getArrSplitNumber(0, minute)
					this.time.hours = this.getArrSplitNumber(0, hour)
				} else if (value === 0) {
					this.time.hours = this.getArrSplitNumber(hour, 23)
					this.time.minutes = this.getArrSplitNumber(minute, 59)
					this.time.time.setMinutes(minute)
				}
				break
			case 'minute':
				this.time.time.setMinutes(value)
				break
			case 'hour':
				if (this.time.days === 0) {
					if (hour !== value) this.time.minutes = this.getArrSplitNumber(0, 59)
					else this.time.minutes = this.getArrSplitNumber(minute, 59)
				} else if (this.time.days === 1) {
					this.time.minutes = this.getArrSplitNumber(0, 59)
				} else {
					if (value === hour) this.time.minutes = this.getArrSplitNumber(0, minute)
					else this.time.minutes = this.getArrSplitNumber(0, 59)
				}
				this.time.time.setHours(value)
				break
		}
		this.time.timeString = Util.formatTime('yyyy-MM-dd hh:mm', this.time.time)
	}
	TimepublishMoadleCancel(){
		this.showTimePublish=false
	}
	TimepublishMoadleOk(){
		this.onSubmit(2)
		this.showTimePublish=false
	}
  getTags($event){
		this.items.tags.push($event)
		
	}
	getTypeList (){
		this.typeList = [
			{
				id: '1',
				fullName: '文章类型1'
			},
			{
				id: '2',
				fullName: '文章类型2'
			}
		]
	}
	previewImg(input) {
		let that = this
		that.uploadMsg = '图片上传中，请稍后！'
		that.upload = 'uploading'
		if (input.srcElement.files && input.srcElement.files[0]) {
			let file = input.srcElement.files[0]
			that.uploadImg(file)
			// let reader = new FileReader()
			// reader.readAsDataURL(file)
			// reader.onload = function(e) {
			// 	let result = reader.result + '' // 获取到base64
			// 	let maxsize = 500 * 1024
			// 	if (result['length'] >= maxsize) {
			// 		let img = new Image()
			// 		img.src = result
			// 		let compressImg = ''
			// 		img.onload = function() {
			// 			compressImg = that.compress(img, 0.8, 100)
			// 			that.uploadImg(compressImg)
			// 		}
			// 	} else {
			// 		that.uploadImg(result)
			// 	}
			// }
		}
	}
	uploadImg(img) {
		// this.imgBase.file = img
		// let form = "file="+img;
		let form = new FormData();
		form.append("file",  img)
		this.http.upload('/upload', form).then((result) => {
			if (result) {
				this.uploadMsg = '图片上传成功！图片地址：' + result.location
				this.defaultImgUrl = result.location
				this.items.picture = this.defaultImgUrl
				this.upload = 'uploaded'
			}
		})
	}
	keyupHandler(e) {//富文本内容导出
    console.log(e)
		this.items.content = e
  }
}
class Items {
	constructor(
		public id?: String,
		public title?: String,
		public originResource?: String,
		public read?: String,
		public favorite?: String,
		public tags?: Array<1>,
		public picture?: String,
		public content?: String
  ) {}
  }
	class Util {
		public static formatTime(format = 'yyyyMMddhhmmssSSS', time = new Date()) {
			var o = {
				'M+': time.getMonth() + 1, //月份
				'd+': time.getDate(), //日
				'h+': time.getHours(), //小时
				'm+': time.getMinutes(), //分
				's+': time.getSeconds(), //秒
				'q+': Math.floor((time.getMonth() + 3) / 3), //季度
				'S+': time.getMilliseconds() //毫秒
			}
			if (/(y+)/.test(format))
				format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
			for (var k in o) {
				if (new RegExp('(' + k + ')').test(format)) {
					let regLength = RegExp.$1.length
					let valLength = (o[k] + '').length
					while (regLength > valLength) {
						o[k] = '0' + o[k]
						regLength--
					}
					format = format.replace(RegExp.$1, o[k])
				}
			}
			return format
		}
	}
	
import { Injectable } from '@angular/core'
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty'

export interface toastConfig {
	title?: string
	msg?: string
	type?: string
}

@Injectable()
export class PopService {
	constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {}

	addToast(config: toastConfig) {
		const toastOptions: ToastOptions = {
			title: config.title ? config.title : '提示',
			msg: config.msg ? config.msg : '出错了',
			showClose: true,
			timeout: 5000,
			theme: 'material'
		}
		switch (config.type) {
			case 'default':
				this.toastyService.default(toastOptions)
				break
			case 'info':
				this.toastyService.info(toastOptions)
				break
			case 'success':
				this.toastyService.success(toastOptions)
				break
			case 'wait':
				this.toastyService.wait(toastOptions)
				break
			case 'error':
				this.toastyService.error(toastOptions)
				break
			case 'warning':
				this.toastyService.warning(toastOptions)
				break
		}
	}
}

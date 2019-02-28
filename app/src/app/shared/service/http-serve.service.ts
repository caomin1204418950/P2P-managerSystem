
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { AuthService } from './auth.service';
// import { CookieService } from 'ngx-cookie';
import { HttpInterceptorService } from 'ng-http-interceptor';
import { Router } from '@angular/router';
@Injectable()
export class HttpService {

  api:String="/api/guest-manage";//线上8040接口
  api2:String="/api/";//吴哥7300接口

  loginApi:String='/api'
  //应启明星添加
  headers: Headers
	uploadHeaders: Headers
  constructor(private http: Http, private auth: AuthService,
    // private cookie: CookieService,
    private route: Router,
    private httpInterceptor: HttpInterceptorService) {
      this.httpInterceptor.request().addInterceptor((data, method) => {
        return data;
      });
  
      this.httpInterceptor.response().addInterceptor(res => res.do(null, e => {
        if(e.status == 403){
          // this.cookie.remove("Template");
          this.route.navigate(['/login']);
        }
        return res;
      }));
      this.headers = new Headers({
        'Content-Type': 'application/json'
      })
  }

  login(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.post(this.loginApi + url, data, { headers: headers })
      .map(res => res.json());
  }

  getCustomHeaders2(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.get(url, { headers: headers })
      .map(res => res.json())
  }

  getCustomHeaders(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.get(this.api + url, { headers: headers })
      .map(res => res.json()) 
  }

  getCustomHeaders3(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.get(this.api2 + url, { headers: headers })
      .map(res => res.json())
  }
  postCustomHeaders(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.api + url, data, { headers: headers })
      .map(res => res.json())
  }

  putCustomHeaders(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.put(this.api + url, data, { headers: headers })
      .map(res => res.json());
  }

  deleteCustomHeaders(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.delete(this.api + url, { headers: headers })
    .map(res => res.json());
  }
  deleteLevel(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.delete(this.api2 + url, { headers: headers })
    .map(res => res.json());
  }

  patchCustomHeaders(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.patch(this.api +url, data, { headers: headers })
      .map(res => res.json());
  }
  
  uploadCustomHeaders(url: string){
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.post( url, { headers: headers })
      .map(res => res.json());
  }
  upload(url: string, body: any = {}, contentType: string = 'multipart/form-data', customMessage = false) {
		this.headers['Content-Type'] = contentType
		return this.http
			.post(url, body, { headers: this.uploadHeaders })
			.toPromise()
			.then((res) => {
				return res.json();
			})
			.catch()
	}
  // 花蝴蝶首页
  
  getCustomHeaders4(url:string){
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.get(this.api2 + url, { headers: headers })
      .map(res => res.json())
  }
  getGroupDateGrid(url:string){
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.get(this.api2 + url, { headers: headers })
      .map(res => res.json())
  }
  postGroup(url:string,data:any){
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.post(this.api2 + url, data, { headers: headers })
      .map(res => res.json())
  }
  patchGroup(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.patch(this.api2 +url, data, { headers: headers })
      .map(res => res.json());
  }
  putGroup(url: string, data: any){
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.put(this.api2 + url, data, { headers: headers })
      .map(res => res.json());
  } 
  patchArticle(url: string){
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.patch (this.api2 + url, { headers: headers })
      .map(res => res.json());
  }
}
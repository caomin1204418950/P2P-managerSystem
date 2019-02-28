
import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {

  // constructor(private cookie:CookieService) { 

  // }
  constructor() { 

  }

  logOff(auth:string){
    // this.cookie.remove(auth);
  }

  getAuthorization(auth:string){
    // return this.cookie.get(auth);
  }

}


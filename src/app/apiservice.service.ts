import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEventType,
  HttpParams
} from '@angular/common/http';
import {
  AuthService
} from './auth.service';
import {
  Router
} from '@angular/router';
import {
  environment
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  baseUrl = environment.apiUrl;
  token: string;


  constructor(private http: HttpClient, private authService: AuthService, public router: Router) {
   
    this.getAuthHeader();
   }


  public getAuthHeader() {
    this.token = localStorage.getItem("authToken")
    console.log(this.token)
    let header: HttpHeaders;
    header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer' + ' ' + this.token,
    });

    return header;
  }


  public getResetPassword() {
    let header: HttpHeaders;
    header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    
    });

    return header;
  }


  public login(data: any) {
    const body = {
      email_address: data.emailId,
      password: data.password
    };

    return this.http.post(this.baseUrl + '/signin', body);
  }


  public register(data: any) {
    const body = {
      first_name: data.firstName,
      last_name: data.lastName,
      email_address: data.emailId,
      password: data.password,
      confirm_password: data.cpassword,
      country_code: data.countryCode,
      phone: data.phone
    };

    return this.http.post(this.baseUrl + '/signup', body);
  }


  public forgotPassword(data: any) {
    const body = {
      email_address: data.emailId,
    };

    return this.http.post(this.baseUrl + '/forgot_password', body);
  }

  public resetPassword(data: any, resetLink: any) {
    const params = new HttpParams()
      .set('new_password', data.password)
      .set('confirm_password', data.cpassword)
    return this.http.post( resetLink,   params,  {
      headers: this.getResetPassword()
    });
  }


  public counytryList() {

   
   
    return this.http.get(this.baseUrl +  '/countrycode');
  }

  public chartList() {
    const body = {
      chart_input : "GHP",
      device_name:"OMNITEMP001",
      time_interval:"1"
    }
    return this.http.post(this.baseUrl + '/chart_data' , body , {
      headers: this.getAuthHeader()
    });
  }


  public getProfile() {
   
    return this.http.get(this.baseUrl + '/get_user_profile',  {
      headers: this.getAuthHeader()
    });
  }


  public iot_datas() {
   
    return this.http.get(this.baseUrl + '/list_iotdata' ,  {
      headers: this.getAuthHeader()
    });
  }


  
  public updateProfile(data: any) {
    const body = {
      first_name: data.firstName,
      last_name: data.lastName,
      country_code: data.countryCoded,
      phone: data.phone
    }

    return this.http.put(this.baseUrl + '/update_user_profile', body ,  {
      headers: this.getAuthHeader()
    });
  }

}

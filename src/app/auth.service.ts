import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  resetUrl = new BehaviorSubject < any > ('');
  
  constructor() { 

 
  }
}

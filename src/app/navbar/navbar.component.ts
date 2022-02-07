import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd
} from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userEmail: string;
  userId: string;

  constructor( private apiService: ApiserviceService, public router: Router) { }

  ngOnInit(): void { 
    this.userEmail = localStorage.getItem("email");
    this.userId = localStorage.getItem("id");
  }


  
  logout() {
   this.router.navigate(['/'])
   localStorage.clear()
  }


}

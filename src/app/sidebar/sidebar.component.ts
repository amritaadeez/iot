import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ApiserviceService
} from '../apiservice.service';
import {
  AuthService
} from '../auth.service';
import {
  Subscription
} from 'rxjs';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({
            transform: 'translateY(0%)',
            opacity: 0
          }),
          animate('500ms', style({
            transform: 'translateY(0%)',
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            transform: 'translateX(0%)',
            opacity: 1
          }),
          animate('500ms', style({
            transform: 'translateY(0%)',
            opacity: 0
          }))
        ])
      ]
    )
  ],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  hideMobileMenu = false;
  panelOpenState = false;
  hideSideNav: boolean = false;
  activated: any;
  roleAcess: any = [];
  activeColour: boolean = false;
  isAdmin: any;
  isHome: any;
  isCustomer: any;
  isTrasit: any;
  isOffers: any;
  isReports: any;
  isReportsTrxn: any;
  isReportsSearch: any;
  isReportscard: any;
  isSettlement: any;
  isGames: any;
  isBanners: any;
  toggleData: boolean = true;
  isCount: string;
  isMismachedAuth: string;
  isChargeBack: string;
  constructor(
    private apiService: ApiserviceService,
    private authService: AuthService,
    public router: Router,
  ) {

   


  }


  ngOnInit() {}

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
    this.hideMobileMenu = !this.hideMobileMenu;

  }


  activeClass() {
    this.activated = 'true';
    localStorage.setItem('activeTrue', this.activated)
    this.activeColour = !this.activeColour;

  }



  remove() {
    this.activeColour = false;
    this.activated = 'false';
    localStorage.setItem('activeTrue', 'false')
  }
}

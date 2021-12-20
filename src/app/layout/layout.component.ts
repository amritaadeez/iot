import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  toggle = true;
  showFiller = true;
  activated: any;
  roleAcess: any;
  isAdmin: string;
  isHome: string;
  isCustomer: string;
  isTrasit: string;
  isOffers: string;
  isReports: string;
  isReportsTrxn: string;
  isReportsSearch: string;
  isReportscard: string;
  isSettlement: string;
  isBanners: string;
  isGames: string;
  activeColour: boolean;
  hideSideNav: boolean;
  hideMobileMenu: boolean;
  isCount: string;
  isMismachedAuth: string;
  panelOpenState: boolean = false;
  panelOpenState2: boolean = false;
  panelOpenState3: boolean = false;
 @ViewChild(MatAccordion) accordion: MatAccordion;
  isSettlementOmni: string;
  isSettlementRupay: string;
  isSettlementAddMoney: string;
  isSettlementQR: string;
  isSettlementRecharge: string;
  isSettlementMT: string;
  isSettlementPending: string;
  isSettlementRefund: string;
  wholeSettlement: boolean;
  isChargeBack: string;
  token: any;
  isPincode: string;
  configration: string;

  constructor(private authService: AuthService, public dialog: MatDialog,) {

    this.token = localStorage.getItem('loginToken')
    if(!this.token) {
      this.dialog.closeAll();
    }
  
   

  }
  ngOnInit(): void {
    

  }
  toggles() {
    this.toggle = !this.toggle
    this.showFiller = !this.showFiller;
  }
  reportsToggle(data: any) {
    this.toggle  = true
    this.showFiller = true;
  }
  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
    this.hideMobileMenu = !this.hideMobileMenu;
  }
  activeClass() {
    this.activated = 'true';
    this.activeColour = !this.activeColour;
  }

}

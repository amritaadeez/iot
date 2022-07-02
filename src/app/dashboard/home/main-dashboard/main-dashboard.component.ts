import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiserviceService
} from 'src/app/apiservice.service';
import * as moment from 'moment';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from 'src/app/auth.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  color = 'accent';
  checked = false;
  disabled = false;
  graphShown: any;
  term: any
  legend: boolean = true;
  legendPosition: string = 'below';
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Values';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  wifiarray: Array < any > = []

  currentDate = new Date()

  Object = Object;

  //pie
  showLabels = true;
  // showLine : any[]


  saleData: any[]

  collection = [{
      
      
          "firstName": "Vikas",
          "lastName": "Pandey",
          "userName": "vikaPaney",
          "email": "vikapandey@eroute.in"

  },
  {
      
      
    "firstName": "Vikas",
    "lastName": "Pandey",
    "userName": "vikaPaney",
    "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

},{
      
      
  "firstName": "Vikas",
  "lastName": "Pandey",
  "userName": "vikaPaney",
  "email": "vikapandey@eroute.in"

}

  ];

  saleDataPie = [

  ];

  p: number = 1;

  label: any;
  chartDataYAxis: any;
  saleDataObj: any;
  chartDataXAxis: any;
  fullIotData: any;
  insideIotData: any;
  insideIot: Array < any > = []
  loader: boolean;
  iotdata: any;
  nameList: any;

  view = [400, 350]
  checkLength: any;
  dateFilter: any;
  responseDate: any;
  wifi: any;
  nextDate: number;
  previousDate: number;
  wifi1: boolean = true;
  constructor(private apiService: ApiserviceService, private _snackbar: MatSnackBar, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {


  }


}

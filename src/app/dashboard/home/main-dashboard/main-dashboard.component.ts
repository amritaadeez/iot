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

  showLine = [{
      "name": "Line Chart",
      "series": [{
          "name": "1",
          "value": 120
        },
        {
          "name": "2",
          "value": 333
        },
        {
          "name": "4",
          "value": 474
        },
        {
          "name": "5",
          "value": 174
        },
        {
          "name": "6",
          "value": 374
        },
        {
          "name": "7",
          "value": 674
        },
        {
          "name": "8",
          "value": 974
        },
        {
          "name": "43",
          "value": 74
        },
        {
          "name": "14",
          "value": 1074
        },
        {
          "name": "22",
          "value": 44
        },
        {
          "name": "422",
          "value": 411
        },
        {
          "name": "42",
          "value": 1474
        }
      ]
    },


  ];

  saleDataPie = [

  ];

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


    if (localStorage.getItem("fulldata")) {
      this.checkLength = localStorage.getItem("fulldata")

      console.log(this.checkLength.length)
      console.log(JSON.parse(this.checkLength))
      this.fullIotData = JSON.parse(this.checkLength)
    } else {

    }
    this.listIot()
    this.iotdata = setInterval(() => {
      this.listIotTimer();
    }, 15000);
  }


  listIot() {
    console.log(this.checkLength)
    if (!this.checkLength) {
      this.loader = true

    } else {

      this.fullIotData = JSON.parse(this.checkLength)
      let responseAllData: any = []
      for (let i = 0; i < this.fullIotData.length; i++) {

        // for (let j=0; j < 4 ; j++) {

        responseAllData.push({
          "name": this.fullIotData[i].DeviceName,
          "value": this.fullIotData[i].iot_data[0].iot_value,
        })
        console.log(responseAllData)

        this.saleDataPie = responseAllData
        console.log(this.saleDataPie)
      }
      this.loader = false
    }
    console.log("dd")
    this.apiService.iot_datas().subscribe(
      (response: any) => {
        console.log(response)
        this.fullIotData = response
        this.nameList = response.iot_data
        console.log(this.fullIotData)
        localStorage.setItem("fulldata", JSON.stringify(this.fullIotData))
        
        this.loader = false
        let responseAllData: any = []
        for (let i = 0; i < response.length; i++) {

          // for (let j=0; j < 4 ; j++) {
          console.log(moment(response[i].Timing_format).format('x'))
          this.responseDate = moment(response[i].Timing_format).format('x')
          console.log('this is', this.responseDate);
          var dt: any = new Date();
          var minutesToAdd = 2;
          var minutesToSub = 2;
          this.previousDate = new Date(dt - minutesToSub * 60000).valueOf();
          this.nextDate = new Date(dt + minutesToSub * 60000).valueOf();
          // this.previousDate = 1647091667000
          // this.nextDate = 1647091787000;
          console.log(this.nextDate, "next dated")
          console.log(this.previousDate, "previous dated")
          console.log(this.responseDate, "response dated")
          if (this.responseDate <= this.nextDate && this.responseDate > this.previousDate) {
            this.wifi = "1"
          } else {
            this.wifi = "2"
          }
          this.fullIotData[i].iot_data.push({
            wifi: this.wifi
          })
          responseAllData.push({
            "name": response[i].DeviceName,
            "value": response[i].iot_data[0].iot_value,
          })
          console.log(responseAllData)

          this.saleDataPie = responseAllData
          console.log(this.saleDataPie)
        }



      }, (error: any) => {
        console.log(error.error.text)
        this._snackbar.open("Unauthorize access", "Login Again", {
          duration: 3000
        });
        this.router.navigate(['/'])
        localStorage.clear()

        //  this.fullIotData = JSON.parse(error.error.text.data)
        // console.log(this.fullIotData)
      }
    );
  }

  listIotTimer() {
    this.wifiarray = []
    console.log(moment(this.currentDate).format('x'))

    this.dateFilter = moment(this.currentDate).format('x')
    console.log("dd")
    this.apiService.iot_datas().subscribe(
      (response: any) => {
        console.log(response)
        this.fullIotData = response
        this.nameList = response.iot_data
        console.log(this.fullIotData)

        this.loader = false
        let responseAllData: any = []
        for (let i = 0; i < response.length; i++) {

          // for (let j=0; j < 4 ; j++) {
          console.log(moment(response[i].Timing_format).format('x'))
          this.responseDate = moment(response[i].Timing_format).format('x')
          console.log('this is', this.responseDate);
          var dt: any = new Date();
          var minutesToAdd = 2;
          var minutesToSub = 2;
          this.previousDate = new Date(dt - minutesToSub * 60000).valueOf();
          this.nextDate = new Date(dt + minutesToSub * 60000).valueOf();
          // this.previousDate = 1647091667000
          // this.nextDate = 1647091787000;
          console.log(this.nextDate, "next dated")
          console.log(this.previousDate, "previous dated")
          console.log(this.responseDate, "response dated")
          if (this.responseDate <= this.nextDate && this.responseDate > this.previousDate) {
            this.wifi = "1"
          } else {
            this.wifi = "2"
          }
          this.fullIotData[i].iot_data.push({
            wifi: this.wifi
          })
          responseAllData.push({
            "name": response[i].DeviceName,
            "value": response[i].iot_data[0].iot_value,
          })
          console.log(responseAllData)

          this.saleDataPie = responseAllData
          console.log(this.saleDataPie)
        }
        localStorage.setItem("fulldata", JSON.stringify(this.fullIotData))
      }, (error: any) => {
        console.log(error.error.text)
        this._snackbar.open("Unauthorize access", "Login Again", {
          duration: 3000
        });
        this.router.navigate(['/'])
        localStorage.clear()


        //  this.fullIotData = JSON.parse(error.error.text.data)
        // console.log(this.fullIotData)
      }
    );
  }

  ngOnDestroy() {
    clearInterval(this.iotdata);
  }

  routeChange(iotData: any) {
    this.authService.iotDataGraph.next(iotData)
    this.router.navigate(['/dashboard/home/analytics'])

  }

}

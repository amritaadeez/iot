import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

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



  Object = Object;
  
  //pie
  showLabels = true;
// showLine : any[]


  saleData : any[]

  showLine = [
    {
      "name": "Line Chart",
      "series": [
        {
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
  insideIot: Array<any> = []
  loader: boolean;
  iotdata: any;
  nameList: any;

  view=[400, 350]
  constructor(private apiService: ApiserviceService, private _snackbar: MatSnackBar, private router: Router, private authService: AuthService ) {

   
   }

  ngOnInit(): void {
    this.listIot()
   
    // this.iotdata = setInterval(() => {
    //   this.listIotTimer(); 
    //   }, 10000);
  }


  listIot() {
   
    this.loader = true
    console.log("dd")
    this.apiService.iot_datas().subscribe(
      (response:any) => {
        console.log(response)
        this.fullIotData = response
        this.nameList = response.iot_data
        console.log(this.fullIotData)
        localStorage.setItem("fulldata", JSON.stringify(this.fullIotData))

      this.loader = false
      let responseAllData : any = []
      for(let i = 0; i < response.length ; i++ ) {

        // for (let j=0; j < 4 ; j++) {

        responseAllData.push({
         "name": response[i].DeviceName,
         "value": response[i].iot_data[0].iot_value,
        })
        console.log(responseAllData)
     
        this.saleDataPie = responseAllData
        console.log(this.saleDataPie)
       }



       }, (error:any) => {
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
   
    console.log("dd")
    this.apiService.iot_datas().subscribe(
      (response:any) => {
        console.log(response)
        this.fullIotData = response
        this.nameList = response.iot_data
        console.log(this.fullIotData)
        localStorage.setItem("fulldata", JSON.stringify(this.fullIotData))

      this.loader = false
      let responseAllData : any = []
      for(let i = 0; i < response.length ; i++ ) {

        // for (let j=0; j < 4 ; j++) {

        responseAllData.push({
         "name": response[i].DeviceName,
         "value": response[i].iot_data[0].iot_value,
        })
        console.log(responseAllData)
     
        this.saleDataPie = responseAllData
        console.log(this.saleDataPie)
       }



       }, (error:any) => {
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

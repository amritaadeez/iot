import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
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
  constructor(private apiService: ApiserviceService, private _snackbar: MatSnackBar, private router: Router) {

   
   }

  ngOnInit(): void {
    this.listIot()
   
    this.iotdata = setInterval(() => {
      this.listIotTimer(); 
      }, 10000);
  }


  listIot() {
   
    this.loader = true
    console.log("dd")
    this.apiService.iot_datas().subscribe(
      (response:any) => {
        console.log(response)
        this.fullIotData = response.data
        console.log(this.fullIotData)
        localStorage.setItem("fulldata", JSON.stringify(this.fullIotData))

      this.loader = false
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
        this.fullIotData = response.data
        console.log(this.fullIotData)
        localStorage.setItem("fulldata", JSON.stringify(this.fullIotData))

      this.loader = false
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

  showGraph(data:any) {
    this.loader = true
    this.apiService.chartList().subscribe(
      (response:any) => {
        console.log(response)
        this.label = response.chartLabel
        this.chartDataYAxis = response.chartdata
        this.chartDataXAxis = response.labels

        let responseAllData : any = []
        let test = response
        let array = []
        array.push(response)        


        this.loader =  false
       
        for(let i = 0; i < response.chartdata.length ; i++ ) {

         responseAllData.push({
          "name": this.chartDataXAxis[i],
          "value": this.chartDataYAxis[i],
         })
         console.log(responseAllData)
         this.saleDataObj =  {
           "name": "Germany",
           "series": responseAllData
         }  
         this.saleData = responseAllData
        //  this.showLine = this.saleDataObj
         console.log(this.showLine)
        }
      }
    );
      
      

    this.graphShown = data.checked
  }

 
}

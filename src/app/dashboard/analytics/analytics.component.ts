import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  color = 'accent';
  checked = false;
  disabled = false;
  graphShown: any;
  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
  ]
  
  view: any[] = [1100, 500];
  
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
    domain: ['#87CEFA','#9370DB',  '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;
// showLine : any[]


  graphData : any[]
  
  label: any;
  chartDataYAxis: any;
  graphDataObj: any;
  chartDataXAxis: any;
  fullIotData: any;
  insideIotData: any;
  insideIot: Array<any> = []
  loader: boolean;
  responseGraph: any;
  chartDataYAxisYesterday: any;
  chartDataXAxisYesterday: any;
  chartDataYAxisWeek: any;
  chartDataXAxisWeek: any;
  graphDataWeek: any;
  graphDataYesterday: any;
  graphLoader: any;
  infoGraph: any;
  constructor(private apiService: ApiserviceService, private authService: AuthService) { 
    this.view = [innerWidth / 1.35, 480];
  }

  ngOnInit(): void {
    this.authService.iotDataGraph.subscribe(
      data => {
        console.log(data)
        this.infoGraph =  data
      }
    )
    this.showGraph()

    this.graphLoader = setInterval(() => {
      this.showGraphLoader(); 
      }, 10000);
  }

 

  showGraph() {
    this.loader = true
    this.apiService.chartList(this.infoGraph).subscribe(
      (response:any) => {
        console.log(JSON.parse(JSON.stringify(response)))
        this.responseGraph = response
        this.label = response.Today_Data
        console.log(this.label)
        this.chartDataYAxis = response.Today_Data.IOTData
        this.chartDataXAxis = response.Today_Data.Timing


        this.chartDataYAxisYesterday = response.Yesterday_Data.IOTData
        this.chartDataXAxisYesterday = response.Yesterday_Data.Timing

        this.chartDataYAxisWeek = response.LastWeek_Data.IOTData
        this.chartDataXAxisWeek = response.LastWeek_Data.Timing

        let responseAllData : any = []
        let responseAllDataYesterday : any = []
        let responseAllDataWeek : any = []
        let test = response
        let array = []
        array.push(response.Today_Data)        


        this.loader =  false
       
        for(let i = 0; i < response.Today_Data.IOTData.length ; i++ ) {

         responseAllData.push({
          "name": this.chartDataXAxis[i],
          "value": this.chartDataYAxis[i],
         })
         console.log(responseAllData)
      
         this.graphData = responseAllData
        //  this.showLine = this.graphDataObj
         console.log(this.graphData)
        }


        for(let i = 0; i < response.Yesterday_Data.IOTData.length ; i++ ) {

          responseAllDataYesterday.push({
           "name": this.chartDataXAxisYesterday[i],
           "value": this.chartDataYAxisYesterday[i],
          })
          console.log(responseAllData)

          let arr = []
          arr.push(responseAllDataYesterday)
          this.graphDataObj =  {
            "name": "VAlues",
            "series": responseAllDataYesterday
          }  
          console.log(this.graphDataObj)
          console.log(this.multi)
          console.log(JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/,"[ { $1 }]")))
          this.graphDataYesterday = JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/,"[ { $1 }]"))
         //  this.showLine = this.graphDataObj
          console.log(this.graphDataYesterday)
          
         }

         for(let i = 0; i < response.LastWeek_Data.IOTData.length ; i++ ) {

          responseAllDataWeek.push({
           "name": this.chartDataXAxisWeek[i],
           "value": this.chartDataYAxisWeek[i],
          })
          console.log(responseAllDataWeek)
    
          this.graphDataWeek = responseAllDataWeek
         //  this.showLine = this.graphDataObj
          console.log(this.graphDataWeek)
         }

      }, (error: any) => {
        console.log(error.error.text.Today_Data)
      }
    );
      
  }

  showGraphLoader() {
    this.apiService.chartList(this.infoGraph).subscribe(
      (response:any) => {
        console.log(JSON.parse(JSON.stringify(response)))
        this.responseGraph = response
        this.label = response.Today_Data
        console.log(this.label)
        this.chartDataYAxis = response.Today_Data.IOTData
        this.chartDataXAxis = response.Today_Data.Timing


        this.chartDataYAxisYesterday = response.Yesterday_Data.IOTData
        this.chartDataXAxisYesterday = response.Yesterday_Data.Timing

        this.chartDataYAxisWeek = response.LastWeek_Data.IOTData
        this.chartDataXAxisWeek = response.LastWeek_Data.Timing

        let responseAllData : any = []
        let responseAllDataYesterday : any = []
        let responseAllDataWeek : any = []
        let test = response
        let array = []
        array.push(response.Today_Data)        


        this.loader =  false
       
        for(let i = 0; i < response.Today_Data.IOTData.length ; i++ ) {

         responseAllData.push({
          "name": this.chartDataXAxis[i],
          "value": this.chartDataYAxis[i],
         })
         console.log(responseAllData)
      
         this.graphData = responseAllData
        //  this.showLine = this.graphDataObj
         console.log(this.graphData)
        }


        for(let i = 0; i < response.Yesterday_Data.IOTData.length ; i++ ) {

          responseAllDataYesterday.push({
           "name": this.chartDataXAxisYesterday[i],
           "value": this.chartDataYAxisYesterday[i],
          })
          console.log(responseAllData)

          let arr = []
          arr.push(responseAllDataYesterday)
          this.graphDataObj =  {
            "name": "VAlues",
            "series": responseAllDataYesterday
          }  
          console.log(this.graphDataObj)
          console.log(this.multi)
          console.log(JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/,"[ { $1 }]")))
          this.graphDataYesterday = JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/,"[ { $1 }]"))
         //  this.showLine = this.graphDataObj
          console.log(this.graphDataYesterday)
          
         }

         for(let i = 0; i < response.LastWeek_Data.IOTData.length ; i++ ) {

          responseAllDataWeek.push({
           "name": this.chartDataXAxisWeek[i],
           "value": this.chartDataYAxisWeek[i],
          })
          console.log(responseAllDataWeek)
    
          this.graphDataWeek = responseAllDataWeek
         //  this.showLine = this.graphDataObj
          console.log(this.graphDataWeek)
         }

      }, (error: any) => {
        console.log(error.error.text.Today_Data)
      }
    );
      
  }


  ngOnDestroy() {
    clearInterval(this.graphLoader);
  }
 
}

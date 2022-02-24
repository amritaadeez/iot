import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import * as moment from 'moment';
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


  graphData : any[]
  
  label: any;
  chartDataYAxis: any;
  graphDataObj: any;
  chartDataXAxis: any;
  fullIotData: any;
  insideIotData: any;
  insideIot: Array<any> = []
  loader: boolean;
  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.showGraph()
  }


  showGraph() {
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
         this.graphDataObj =  {
           "name": "Germany",
           "series": responseAllData
         }  
         this.graphData = responseAllData
        //  this.showLine = this.graphDataObj
         console.log(this.graphData)
        }
      }
    );
      
  }

 
}

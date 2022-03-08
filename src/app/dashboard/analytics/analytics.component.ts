import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiserviceService
} from 'src/app/apiservice.service';
import * as moment from 'moment';
import {
  AuthService
} from 'src/app/auth.service';
import {
  Router
} from '@angular/router';
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

  view: any[] = [1100, 500];

  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  // xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Values';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#FA8072', '#FF7F50', '#90EE90', '#9370DB', '9370DB', '#87CEFA', '#9370DB', ]
  };
  colorareaScheme = {
    domain: ['#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;
  // showLine : any[]


  graphData: any[]

  label: any;
  chartDataYAxis: any;
  graphDataObj: any;
  chartDataXAxis: any;
  fullIotData: any;
  insideIotData: any;
  insideIot: Array < any > = []
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
  graphDataTwo: any;
  graphDataThree: any;
  graphDataFour: any;
  graphComapreData: any;

  todayLength: any
  yesterdayLength: any
  weekLength: any
  selectedTime: any
  overlapLoader: boolean = false;

  constructor(private apiService: ApiserviceService, private authService: AuthService, private router: Router) {
    this.view = [innerWidth / 1.35, 520];
  }


  setTime(data: any) {
    console.log(data.target.value)
    this.overlapLoader = true
    this.selectedTime = data.target.value
  }

  ngOnInit(): void {
    this.authService.iotDataGraph.subscribe(
      data => {
        console.log(data)
        if (!data) {
          this.router.navigate(['/dashboard/home/main'])
        } else {
          this.infoGraph = data

        }
      }
    )
    this.showGraph()

    this.graphLoader = setInterval(() => {
      this.showGraphLoader();
    }, 5000);
  }


  showGraph() {
    if (!this.chartDataXAxis) {
      this.overlapLoader = true
    } else {
      this.overlapLoader = false
    }

    this.apiService.chartList(this.infoGraph).subscribe(
      (response: any) => {
        console.log(JSON.parse(JSON.stringify(response)))
        this.responseGraph = response
        this.label = response.Today_Data
        console.log(this.label)
        this.chartDataYAxis = response.Today_Data.IOTData
        this.chartDataXAxis = response.Today_Data.Timing

        if (!this.selectedTime) {
          this.todayLength = response.Today_Data.IOTData.length
          this.yesterdayLength = response.Yesterday_Data.IOTData.length
          this.weekLength = response.LastWeek_Data.IOTData.length

        } else {
          this.todayLength = this.selectedTime
          this.yesterdayLength = this.selectedTime
          this.weekLength = this.selectedTime
        }

        this.chartDataYAxisYesterday = response.Yesterday_Data.IOTData
        this.chartDataXAxisYesterday = response.Yesterday_Data.Timing

        this.chartDataYAxisWeek = response.LastWeek_Data.IOTData
        this.chartDataXAxisWeek = response.LastWeek_Data.Timing

        let responseAllData: any = []
        let responseAllDataYesterday: any = []
        let responseAllDataWeek: any = []
        let compareData: any = []
        let test = response
        let array = []
        array.push(response.Today_Data)


        this.loader = false

        for (let i = 0; i < this.todayLength; i++) {
          let transactionDate = moment(response.Today_Data.Timing[i]).utcOffset("+05:30").format("HH:mm:ss")

          console.log(transactionDate)
          responseAllData.push({
            "name": transactionDate,
            "value": this.chartDataYAxis[i],
          })

          compareData.push({
            "name": this.infoGraph.iot_data[i].iot_key,
            "value": this.infoGraph.iot_data[i].iot_value,
          })

          this.graphComapreData = compareData


          console.log(responseAllData)

          this.graphData = responseAllData
          console.log(this.graphData)
        }

        for (let i = 0; i < this.yesterdayLength; i++) {
          let transactionDate = moment(response.Yesterday_Data.Timing[i]).utcOffset("+05:30").format("HH:mm:ss")

          responseAllDataYesterday.push({
            "name": transactionDate,
            "value": this.chartDataYAxisYesterday[i],
          })
          console.log(responseAllData)

          let arr = []
          arr.push(responseAllDataYesterday)
          this.graphDataObj = {
            "name": "Values",
            "series": responseAllDataYesterday
          }
          console.log(JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/, "[ { $1 }]")))
          this.graphDataYesterday = JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/, "[ { $1 }]"))
          console.log(this.graphDataYesterday)

        }

        for (let i = 0; i < this.weekLength; i++) {

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
   
    this.chart2()
    this.chart3()
    this.chart4()

  }

  chart2() {
    this.apiService.chartList2(this.infoGraph).subscribe(
      (response: any) => {
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

        let responseAllData: any = []
        let test = response
        let array = []
        array.push(response.Today_Data)


        this.loader = false

        for (let i = 0; i < this.todayLength; i++) {
          console.log(response.Today_Data.Timing)
          let transactionDate = moment(response.Today_Data.Timing[i]).utcOffset("+05:30").format("HH:mm:ss")

          console.log(transactionDate)
          responseAllData.push({
            "name": transactionDate,
            "value": this.chartDataYAxis[i],
          })
          console.log(responseAllData)

          this.graphDataTwo = responseAllData
          //  this.showLine = this.graphDataObj
          console.log(this.graphDataTwo)
        }


      }, (error: any) => {
        let responseAllData: any = []
        responseAllData.push({
          "name": "No Data Found",
          "value": "10",
        })
        this.graphDataTwo = responseAllData
        console.log(error.error.text.Today_Data)
      }
    );
  
  }

  chart3() {
    this.apiService.chartList3(this.infoGraph).subscribe(
      (response: any) => {
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

        let responseAllData: any = []
        let responseAllDataYesterday: any = []
        let responseAllDataWeek: any = []
        let test = response
        let array = []
        array.push(response.Today_Data)


        this.loader = false

        for (let i = 0; i < this.todayLength; i++) {
          console.log(response.Today_Data.Timing)
          let transactionDate = moment(response.Today_Data.Timing[i]).utcOffset("+05:30").format("HH:mm:ss")

          console.log(transactionDate)
          responseAllData.push({
            "name": transactionDate,
            "value": this.chartDataYAxis[i],
          })
          console.log(responseAllData)

          this.graphDataThree = responseAllData
          //  this.showLine = this.graphDataObj
          console.log(this.graphDataThree)
        }


      }, (error: any) => {
        let responseAllData: any = []
        responseAllData.push({
          "name": "No Data Found",
          "value": "10",
        })
        this.graphDataThree = responseAllData
        console.log(error.error.text.Today_Data)
      }
    );
  }

  chart4() {
    this.apiService.chartList4(this.infoGraph).subscribe(
      (response: any) => {
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

        let responseAllData: any = []
        let responseAllDataYesterday: any = []
        let responseAllDataWeek: any = []
        let test = response
        let array = []
        array.push(response.Today_Data)


        this.loader = false

        for (let i = 0; i < this.todayLength; i++) {
          console.log(response.Today_Data.Timing)
          let transactionDate = moment(response.Today_Data.Timing[i]).utcOffset("+05:30").format("HH:mm:ss")

          console.log(transactionDate)
          responseAllData.push({
            "name": transactionDate,
            "value": this.chartDataYAxis[i],
          })
          console.log(responseAllData)

          this.graphDataFour = responseAllData
          //  this.showLine = this.graphDataObj
          console.log(this.graphDataFour)

          let arr = []
          arr.push(responseAllData)
          this.graphDataObj = {
            "name": "Values",
            "series": responseAllData
          }
          console.log(this.graphDataObj)
          console.log(JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/, "[ { $1 }]")))
          this.graphDataFour = JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/, "[ { $1 }]"))
          //  this.showLine = this.graphDataObj
          console.log(this.graphDataFour)



        }
        this.overlapLoader = false

      }, (error: any) => {
        let responseAllData: any = []
        responseAllData.push({
          "name": "No Data Found",
          "value": "10",
        })
        this.overlapLoader = false
        this.graphDataFour = responseAllData
        console.log(error.error.text.Today_Data)
      }
    );
  }

  showGraphLoader() {

    this.apiService.chartList(this.infoGraph).subscribe(
      (response: any) => {
        console.log(JSON.parse(JSON.stringify(response)))
        this.responseGraph = response
        this.label = response.Today_Data
        console.log(this.label)
        this.chartDataYAxis = response.Today_Data.IOTData
        this.chartDataXAxis = response.Today_Data.Timing

        if (!this.selectedTime) {
          this.todayLength = response.Today_Data.IOTData.length
          this.yesterdayLength = response.Yesterday_Data.IOTData.length
          this.weekLength = response.LastWeek_Data.IOTData.length

        } else {
          this.todayLength = this.selectedTime
          this.yesterdayLength = this.selectedTime
          this.weekLength = this.selectedTime

        }

        this.chartDataYAxisYesterday = response.Yesterday_Data.IOTData
        this.chartDataXAxisYesterday = response.Yesterday_Data.Timing

        this.chartDataYAxisWeek = response.LastWeek_Data.IOTData
        this.chartDataXAxisWeek = response.LastWeek_Data.Timing

        let responseAllData: any = []
        let responseAllDataYesterday: any = []
        let responseAllDataWeek: any = []
        let test = response
        let array = []
        array.push(response.Today_Data)


        this.loader = false

        for (let i = 0; i < this.todayLength; i++) {
          console.log(response.Today_Data.Timing)
          let transactionDate = moment(response.Today_Data.Timing[i]).utcOffset("+05:30").format("HH:mm:ss")

          console.log(transactionDate)
          responseAllData.push({
            "name": transactionDate,
            "value": this.chartDataYAxis[i],
          })
          console.log(responseAllData)

          this.graphData = responseAllData
          //  this.showLine = this.graphDataObj
          console.log(this.graphData)
        }


        for (let i = 0; i < this.yesterdayLength; i++) {
console.log(this.selectedTime, this.yesterdayLength ,"rrrrr")
          let transactionDate = moment(response.Yesterday_Data.Timing[i]).utcOffset("+05:30").format("HH:mm:ss")

          responseAllDataYesterday.push({
            "name": transactionDate,
            "value": this.chartDataYAxisYesterday[i],
          })
          console.log(responseAllData)

          let arr = []
          arr.push(responseAllDataYesterday)
          this.graphDataObj = {
            "name": "Values",
            "series": responseAllDataYesterday
          }
          console.log(this.graphDataObj)
          console.log(JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/, "[ { $1 }]")))
          this.graphDataYesterday = JSON.parse(JSON.stringify(this.graphDataObj).replace(/^\{(.*)\}$/, "[ { $1 }]"))
          //  this.showLine = this.graphDataObj
          console.log(this.graphDataYesterday)

        }

        for (let i = 0; i < this.weekLength; i++) {
          console.log(this.selectedTime, this.weekLength ,"rrrrr")
          let transactionDate = moment(response.LastWeek_Data.Timing[i]).utcOffset("+05:30").format("HH:mm:ss")

          responseAllDataWeek.push({
            "name": transactionDate,
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
    this.chart2()
    this.chart3()
    this.chart4()


  }


  ngOnDestroy() {
    clearInterval(this.graphLoader);
  }

}

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
  selectedTime: any = "no interval"
  overlapLoader: boolean = false;
  graphDataFourYesterday: any;
  graphDataThreeYesterday: any;
  graphDataTwoYesterday: any;
  weekGraph: any;
  selectedOutput: any = "";
  tabClicked: any = "today";
  tabClickedIndex: any;
  weekGraphOne: any;
  weekGraphTwo: any;
  weekGraphThree: any;

  constructor(private apiService: ApiserviceService, private authService: AuthService, private router: Router) {
    this.view = [innerWidth / 1.35, 520];
  }


  setTime(data: any) {

    this.overlapLoader = true
    this.selectedTime = data.target.value

    this.showGraphData()
  }

  selectDeviceOutput(data: any) {

    this.selectedOutput = data.target.value
    console.log(this.selectedOutput)

  }

  ngOnInit(): void {
    this.overlapLoader = true
    this.authService.iotDataGraph.subscribe(
      data => {

        if (!data) {
          this.router.navigate(['/dashboard/home/main'])
        } else {
          this.infoGraph = data
        }
      }
    )

    this.showGraphData()

    this.graphLoader = setInterval(() => {
      this.overlapLoader = false
      this.showGraphData()
    }, 50000);

  }
  tabClick(data: any) {
    console.log(this.graphData)
    this.selectedTime = "no interval"
    this.overlapLoader = true
    this.tabClickedIndex = data.index
    if (this.tabClickedIndex == 0) {
      this.tabClicked = "today"
      
    } else if (this.tabClickedIndex == 1) {
      this.tabClicked = "yesterday"
    
      
    } else {
      this.tabClicked = "weekday"
    }
    this.showGraphData()
  }


  showGraphData() {
    this.apiService.wholeGraph(this.selectedTime, this.tabClicked, this.infoGraph).subscribe(
      (response: any) => {
        this.overlapLoader = false
        if (this.tabClicked == "today") {
          this.responseGraph = response.today_response.data.Iot_data
          this.chartDataYAxis = response.today_response.data.Time_interval
          console.log(this.responseGraph.change_password)
        } else if (this.tabClicked == "yesterday") {
          this.responseGraph = response.yesterday_response.data.Iot_data
          this.chartDataYAxis = response.yesterday_response.data.Time_interval
        } else {
          this.responseGraph = response.week_response.data
          this.chartDataYAxis = response.week_response.data.Friday_data.Timing
        }



        let responseAllData: any = []
        let responseAllData1: any = []
        let responseAllData2: any = []
        let responseAllData3: any = []
        let lineChart: any = []

        console.log(this.responseGraph, this.chartDataYAxis.length, "check data")
        if (this.chartDataYAxis.length > 0) {



          if (this.tabClicked == "today") {
            for (let i = 0; i < this.chartDataYAxis.length; i++) {
              let transactionDate = moment(this.chartDataYAxis[i]).utcOffset("+05:30").format("HH:mm:ss")
              responseAllData.push({
                "name": transactionDate,
                "value": this.responseGraph[0][i],
              })
              this.graphData = responseAllData

              responseAllData1.push({
                "name": transactionDate,
                "value": this.responseGraph[1][i],
              })
              console.log(responseAllData1)

              this.graphDataTwo = responseAllData1

              responseAllData2.push({
                "name": transactionDate,
                "value": this.responseGraph[2][i],
              })
              console.log(responseAllData2)

              this.graphDataThree = responseAllData2


              responseAllData3.push({
                "name": transactionDate,
                "value": this.responseGraph[3][i],
              })

              lineChart.push({
                "name": "Value",
                "series": responseAllData3
              })
              console.log(responseAllData2)

              this.graphDataFour = lineChart
            }
          } else if (this.tabClicked == "yesterday") {
            for (let i = 0; i < this.chartDataYAxis.length; i++) {
              let transactionDate = moment(this.chartDataYAxis[i]).utcOffset("+05:30").format("HH:mm:ss")
              responseAllData.push({
                "name": transactionDate,
                "value": this.responseGraph[0][i],
              })
              this.graphDataYesterday = responseAllData

              responseAllData1.push({
                "name": transactionDate,
                "value": this.responseGraph[1][i],
              })
              console.log(responseAllData1)

              this.graphDataTwoYesterday = responseAllData1

              responseAllData2.push({
                "name": transactionDate,
                "value": this.responseGraph[2][i],
              })
              console.log(responseAllData2)

              this.graphDataThreeYesterday = responseAllData2


              responseAllData3.push({
                "name": transactionDate,
                "value": this.responseGraph[3][i],
              })

              lineChart.push({
                "name": "Value",
                "series": responseAllData3
              })
              console.log(responseAllData2)

              this.graphDataFourYesterday = lineChart
            }
          } else {

            let numberArray = []
            let numberSat = []
            let numberSun = []
            let numberMon = []
            let numberTue = []
            let numberWed = []
            let numberThu = []

            let friday: Array < any > = []
            let saturday: Array < any > = []
            let sunday: Array < any > = []
            let monday: Array < any > = []
            let tuesday: Array < any > = []
            let wednesday: Array < any > = []
            let thursday: Array < any > = []

            let onumberArray = []
            let onumberSat = []
            let onumberSun = []
            let onumberMon = []
            let onumberTue = []
            let onumberWed = []
            let onumberThu = []

            let ofriday: Array < any > = []
            let osaturday: Array < any > = []
            let osunday: Array < any > = []
            let omonday: Array < any > = []
            let otuesday: Array < any > = []
            let owednesday: Array < any > = []
            let othursday: Array < any > = []

            let tnumberArray = []
            let tnumberSat = []
            let tnumberSun = []
            let tnumberMon = []
            let tnumberTue = []
            let tnumberWed = []
            let tnumberThu = []

            let tfriday: Array < any > = []
            let tsaturday: Array < any > = []
            let tsunday: Array < any > = []
            let tmonday: Array < any > = []
            let ttuesday: Array < any > = []
            let twednesday: Array < any > = []
            let tthursday: Array < any > = []

            let thnumberArray = []
            let thnumberSat = []
            let thnumberSun = []
            let thnumberMon = []
            let thnumberTue = []
            let thnumberWed = []
            let thnumberThu = []

            let thfriday: Array < any > = []
            let thsaturday: Array < any > = []
            let thsunday: Array < any > = []
            let thmonday: Array < any > = []
            let thtuesday: Array < any > = []
            let thwednesday: Array < any > = []
            let ththursday: Array < any > = []

            for (let i = 0; i < this.responseGraph.Friday_data.IOTData[0].length; i++) {
              friday = (this.responseGraph.Friday_data.IOTData[0])
              saturday = (this.responseGraph.Saturday_data.IOTData[0])
              sunday = (this.responseGraph.Sunday_data.IOTData[0])
              monday = (this.responseGraph.Monday_data.IOTData[0])
              tuesday = (this.responseGraph.Tuesday_data.IOTData[0])
              wednesday = (this.responseGraph.Wednesday_data.IOTData[0])
              thursday = (this.responseGraph.Thursday_data.IOTData[0])
              numberArray.push(parseInt(friday[i]));
              numberSat.push(parseInt(saturday[i]));
              numberSun.push(parseInt(sunday[i]));
              numberMon.push(parseInt(monday[i]));
              numberTue.push(parseInt(tuesday[i]));
              numberWed.push(parseInt(wednesday[i]));
              numberThu.push(parseInt(thursday[i]));
             
              console.log(numberArray.reduce((a, b) => a + b, 0))
            }
            let allData = []
          
            allData.push(numberArray.reduce((a, b) => a + b, 0), numberSat.reduce((a, b) => a + b, 0), numberSun.reduce((a, b) => a + b, 0), numberMon.reduce((a, b) => a + b, 0), numberTue.reduce((a, b) => a + b, 0), numberWed.reduce((a, b) => a + b, 0), numberThu.reduce((a, b) => a + b, 0))

            let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday"]
            for (let i = 0; i < 7; i++) {

              if (!allData[i]) {
                allData[i] = 0
                console.log(allData[i])
              } else {
                console.log(allData[i])
              }
              console.log(allData)
              
                responseAllData.push({
                  "name": days[i],
                  "value": allData[i],
                })
              

              console.log(responseAllData)
              this.weekGraph = responseAllData


            }

             
            for (let i = 0; i < this.responseGraph.Friday_data.IOTData[1].length; i++) {
              ofriday = (this.responseGraph.Friday_data.IOTData[1])
              osaturday = (this.responseGraph.Saturday_data.IOTData[1])
              osunday = (this.responseGraph.Sunday_data.IOTData[1])
              omonday = (this.responseGraph.Monday_data.IOTData[1])
              otuesday = (this.responseGraph.Tuesday_data.IOTData[1])
              owednesday = (this.responseGraph.Wednesday_data.IOTData[1])
              othursday = (this.responseGraph.Thursday_data.IOTData[1])
              onumberArray.push(parseInt(ofriday[i]));
              onumberSat.push(parseInt(osaturday[i]));
              onumberSun.push(parseInt(osunday[i]));
              onumberMon.push(parseInt(omonday[i]));
              onumberTue.push(parseInt(otuesday[i]));
              onumberWed.push(parseInt(owednesday[i]));
              onumberThu.push(parseInt(othursday[i]));
             
              console.log(numberArray.reduce((a, b) => a + b, 0))
            }
            let allDataOne = []
            allDataOne.push(onumberArray.reduce((a, b) => a + b, 0), onumberSat.reduce((a, b) => a + b, 0), onumberSun.reduce((a, b) => a + b, 0), onumberMon.reduce((a, b) => a + b, 0), onumberTue.reduce((a, b) => a + b, 0), onumberWed.reduce((a, b) => a + b, 0), onumberThu.reduce((a, b) => a + b, 0))

            let daysOne = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday"]
            for (let i = 0; i < 7; i++) {
              
              if (!allDataOne[i]) {
                allDataOne[i] = 0
                console.log(allDataOne[i])
              } else {
                console.log(allDataOne[i])
              }
                responseAllData1.push({
                  "name": daysOne[i],
                  "value": allDataOne[i],
                })
              

              console.log(responseAllData1)
              this.weekGraphOne = responseAllData1


            }

            for (let i = 0; i < this.responseGraph.Friday_data.IOTData[2].length; i++) {
              tfriday = (this.responseGraph.Friday_data.IOTData[2])
              tsaturday = (this.responseGraph.Saturday_data.IOTData[2])
              tsunday = (this.responseGraph.Sunday_data.IOTData[2])
              tmonday = (this.responseGraph.Monday_data.IOTData[2])
              ttuesday = (this.responseGraph.Tuesday_data.IOTData[2])
              twednesday = (this.responseGraph.Wednesday_data.IOTData[2])
              tthursday = (this.responseGraph.Thursday_data.IOTData[2])
              tnumberArray.push(parseInt(tfriday[i]));
              tnumberSat.push(parseInt(tsaturday[i]));
              tnumberSun.push(parseInt(tsunday[i]));
              tnumberMon.push(parseInt(tmonday[i]));
              tnumberTue.push(parseInt(ttuesday[i]));
              tnumberWed.push(parseInt(twednesday[i]));
              tnumberThu.push(parseInt(tthursday[i]));
             
              console.log(numberArray.reduce((a, b) => a + b, 0))
            }
            let allDataTwo = []
            allDataTwo.push(tnumberArray.reduce((a, b) => a + b, 0), tnumberSat.reduce((a, b) => a + b, 0), tnumberSun.reduce((a, b) => a + b, 0), tnumberMon.reduce((a, b) => a + b, 0), tnumberTue.reduce((a, b) => a + b, 0), tnumberWed.reduce((a, b) => a + b, 0), tnumberThu.reduce((a, b) => a + b, 0))

            let daysTwo = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday"]
            for (let i = 0; i < 7; i++) {
             
              if (!allDataTwo[i]) {
                allDataTwo[i] = 0
                console.log(allDataTwo[i])
              } else {
                console.log(allDataTwo[i])
              } 
                responseAllData2.push({
                  "name": daysTwo[i],
                  "value": allDataTwo[i],
                })
              

              console.log(responseAllData2)
              this.weekGraphTwo = responseAllData2


            }
            for (let i = 0; i < this.responseGraph.Friday_data.IOTData[3].length; i++) {
              thfriday = (this.responseGraph.Friday_data.IOTData[3])
              thsaturday = (this.responseGraph.Saturday_data.IOTData[3])
              thsunday = (this.responseGraph.Sunday_data.IOTData[3])
              thmonday = (this.responseGraph.Monday_data.IOTData[3])
              thtuesday = (this.responseGraph.Tuesday_data.IOTData[3])
              thwednesday = (this.responseGraph.Wednesday_data.IOTData[3])
              ththursday = (this.responseGraph.Thursday_data.IOTData[3])
              thnumberArray.push(parseInt(thfriday[i]));
              thnumberSat.push(parseInt(thsaturday[i]));
              thnumberSun.push(parseInt(thsunday[i]));
              thnumberMon.push(parseInt(thmonday[i]));
              thnumberTue.push(parseInt(thtuesday[i]));
              thnumberWed.push(parseInt(thwednesday[i]));
              thnumberThu.push(parseInt(ththursday[i]));
             
              console.log(numberArray.reduce((a, b) => a + b, 0))
            }
            let allDataThree = []
            allDataThree.push(thnumberArray.reduce((a, b) => a + b, 0), thnumberSat.reduce((a, b) => a + b, 0), thnumberSun.reduce((a, b) => a + b, 0), thnumberMon.reduce((a, b) => a + b, 0), thnumberTue.reduce((a, b) => a + b, 0), thnumberWed.reduce((a, b) => a + b, 0), thnumberThu.reduce((a, b) => a + b, 0))

            let daysThree = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday"]
            for (let i = 0; i < 7; i++) {
             
              if (!allDataThree[i]) {
                allDataThree[i] = 0
                console.log(allDataThree[i])
              } else {
                console.log(allDataThree[i])
              }
                responseAllData3.push({
                  "name": daysThree[i],
                  "value": allDataThree[i],
                })

                let lineChartWeek = []

                lineChartWeek.push({
                  "name":"Value",
                  "series": responseAllData3
                })
              

              console.log(responseAllData3)
              this.weekGraphThree = lineChartWeek


            }

          }
        } else {
          alert("no data found")
        }
      }, (error: any) => {}
    );
  }



  ngOnDestroy() {
    clearInterval(this.graphLoader);
  }

}

import { Component } from '@angular/core';
import { APIChartService } from '../services/apichart.service';
import { NgForm } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';;
//import { WatchlistService } from '../watchlist/watchlist.service';
@Component({
  selector: 'app-apichart',
  templateUrl: './apichart.component.html',
  styleUrls: ['./apichart.component.css']
})
export class APIChartComponent {

  title = 'ngFinance';
  searchResults = [];
  keyword: string = '';
  searchdata = [];

  date$ = [];
  lineData$ = [];
  barData$ = [];
  dailyData$ =  [];
  lineCount: number;
  
  constructor(private _snackBar:MatSnackBar, private service: APIChartService,/* private wsService: WatchlistService*/) { }

  symbols: Symbol[] = [];
  private symbolSub: Subscription;

  onAddWatchList(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.service.addSymbol(form.value.name);
    // form.resetForm();
  }

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        id: 'left-y-axis',
          type: 'linear',
          position: 'left'
        }, {
          id: 'right-y-axis',
          type: 'linear',
          position: 'right'
        }]
      }
  };

  public chartLabels = this.date$;
  public chartLegend = true;
  public chartData = [{data: this.lineData$, 
                      label: 'Price', 
                      yAxisID: 'right-y-axis', 
                      type: 'line'},
                      {data: this.barData$,
                      label: 'Volume', 
                      yAxisID: 'left-y-axis',
                      }];
                  
  timeframes = [
      {id:0, timeframe: 0, label:'1 Day', selected: false},
      {id:1, timeframe: 4, label:'1 Week', selected: false},
      {id:2, timeframe: 20, label:'1 Month', selected: false},
      {id:3, timeframe: 62, label:'3 Months', selected: false},
      {id:4, timeframe: 125, label:'6 Months', selected: false},
      {id:5, timeframe: 251, label:'1 Year', selected: false},
      {id:6, timeframe: 1288, label:'5 Years', selected: false},
      {id:7, timeframe: undefined, label:'Max', selected: false}
    ];

    onKeyup(key : Array<any> = []){
      console.log(key);
      this.keyword += key["key"];
      console.log(this.keyword)
      this.service.search(this.keyword)
      .subscribe((data: { [x: string]: any; }) =>{
        console.log(data);
        let searchdata = data["bestMatches"];
        for (let i = 0; i < searchdata.length; i++) {
          this.searchResults.push({symbol: searchdata[i]["1. symbol"], name: searchdata[i]["2. name"]})
        }
        console.log(this.searchResults)
      })
    }
    
  onChange(event: Array<any> = []){
    let line = [];
    let bar = [];
    console.log();
    this.service.daily(event['srcElement']['value'])
    .subscribe(data=>{
      this.date$ = Object.keys(data["Time Series (Daily)"]);
      this.chartLabels = this.date$.reverse();
      let dailyData = Object.keys(data["Time Series (Daily)"]).map(e=>data["Time Series (Daily)"][e]);
      console.log(dailyData);
      dailyData.forEach(function(day){
        line.unshift(day["4. close"]);
        bar.unshift(day["5. volume"]);       
      })

      this.chartData[0].data=line;
      this.chartData[1].data=bar;
      this.lineData$ = line;
      this.barData$ = bar;
      this.lineCount = line.length - 1;
      this.timeframes[7]={id:7, timeframe: this.lineCount, label:'Max', selected: true};
    });
  }

  onTimeChange(timeframe: number){
    // console.log(timeframe)
    let line = [];
    let bar = [];
    let dates = [];
    for (let i=0; i<=timeframe; i++){
      dates.unshift(this.date$[this.lineCount - i]);
      line.unshift(this.lineData$[this.lineCount - i]);
      bar.unshift(this.barData$[this.lineCount - i]);
    }
    console.log(dates);
    console.log(line);
    console.log(bar);

    this.chartLabels = dates;
    this.chartData[0].data=line;
    this.chartData[1].data=bar;

  }


  


}

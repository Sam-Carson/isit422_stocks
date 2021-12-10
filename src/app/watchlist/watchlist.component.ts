import { Component, OnInit, Input } from '@angular/core';
import { Symbol } from '../Symbol';
import { APIChartService } from '../services/apichart.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WatchlistService} from '../watchlist.service'

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent  {

  urlBeg = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='
  urlEnd = '&apikey=/&apikey=STJWVFPJ06LAI0N7'
  //go to www.alphavantage.co to get your free api key
  dailyBeg = 'https://www.alphavantage.co/query?outputsize=full&function=TIME_SERIES_DAILY&symbol='


  constructor(
    private apiservice: APIChartService,
    private WatchlistService: WatchlistService,
    private http: HttpClient) { }

  search(symbol:string): Observable<any[]>{
    return this.http.get<any[]>(`${this.urlBeg}${symbol}${this.urlEnd}`)
  }

  daily(symbol:string): Observable<any[]>{
    return this.http.get<any[]>(`${this.dailyBeg}${symbol}${this.urlEnd}`)
  }
 
  symbols: Symbol[] = [];
  private symbolSub: Subscription;

  ngOnInit() {
    this.apiservice.getSymbol();
    this.symbolSub = this.apiservice.getSymbolUpdateListener()
      .subscribe((symbols: Symbol[]) => {
        this.symbols = symbols;

        console.log(symbols);
      });
  }

  onDelete(symbolId: string): void{
    this.symbols = this.symbols.filter(h => h.id !== symbolId);
    this.apiservice.deleteSymbol(symbolId);
    this.WatchlistService.deleteSymbol(symbolId);
  }

  ngOnDestroy() {
    this.symbolSub.unsubscribe();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Symbol } from './Symbol';


@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  constructor(private http: HttpClient) { }

  watchlistURL: "/api/symbols/";
  public symbols: Symbol[] = [];
  public symbolUpdated = new Subject<Symbol[]>();

  
  // deleteWatch(id: string): Observable<Symbol> {
  //   const url = $(this.watchlistURL)
  // }

  deleteSymbol(symbolId: string) {
    this.http.delete("http://localhost:3000/api/symbols/" + symbolId)
      .subscribe(() => {
        const updatedSymbols = this.symbols.filter(symbol => symbol.id !== symbolId);
        this.symbols = updatedSymbols;
        this.symbolUpdated.next([...this.symbols]);
      });
  }
}

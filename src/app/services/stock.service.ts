import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StockQuote {
  changeAmount: any;
  percentChange: number;
  symbol: string;
  price: number;
  changesPercentage: number;
  marketCap: number;
}

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) {}

  getIndexQuotes(symbols: string[]): Observable<StockQuote[]> {
    // Financial Modeling Prep API (demo key, replace with your own for production)
    const apiKey = 'demo';
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbols.join(',')}?apikey=${apiKey}`;
    return this.http.get<StockQuote[]>(url);
  }

getCryptoData() {
  // En lugar de: https://api.coingecko.com/api/v3/coins/markets...
  return this.http.get('/api/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false');
}
}
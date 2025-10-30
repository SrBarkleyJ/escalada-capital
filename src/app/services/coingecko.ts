import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) { }

  getTopCryptos(perPage: number = 10): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false`
    );
  }

  getCryptoPrice(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/simple/price?ids=${id}&vs_currencies=usd`
    );
  }

  getMarketChart(id: string, days: number = 30): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
  }
}

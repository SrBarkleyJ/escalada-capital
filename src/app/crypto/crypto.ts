import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoingeckoService } from '../services/coingecko';
import { StockComponent } from '../stock/stock';

interface CryptoItem {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [CommonModule, StockComponent],
  templateUrl: './crypto.html',
  styleUrls: ['./crypto.css'],
})
export class CryptoComponent implements OnInit {

  cryptos: CryptoItem[] = [];
  loading = true;
  error: string | null = null;

  selected: CryptoItem | null = null;
  tvWidget: any = null;
  tvLoading = false;
  listShifted = false;
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef<HTMLDivElement>;

  // Basic TradingView mapping for common coins. Expand as needed.
  private tradingViewMap: Record<string, string> = {
    bitcoin: 'COINBASE:BTCUSD',
    ethereum: 'COINBASE:ETHUSD',
    tether: 'BINANCE:USDTUSD',
    binancecoin: 'BINANCE:BNBUSD',
    ripple: 'COINBASE:XRPUSD',
    solana: 'BINANCE:SOLUSD',
    cardano: 'BINANCE:ADAUSD',
    dogecoin: 'BINANCE:DOGEUSD',
    polkadot: 'BINANCE:DOTUSD',
    'usd-coin': 'BINANCE:USDCUSD',
    avalanche: 'BINANCE:AVAXUSD',
    litecoin: 'COINBASE:LTCUSD',
    chainlink: 'BINANCE:LINKUSD',
    stellar: 'BINANCE:XLMUSD',
    tron: 'BINANCE:TRXUSD'
  };

  constructor(private coingecko: CoingeckoService) {}

  ngOnInit() {
    this.loadCryptos();
  }

  loadCryptos() {
    this.loading = true;
    this.coingecko.getTopCryptos(20).subscribe({
      next: (data: CryptoItem[]) => {
        this.cryptos = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error loading cryptocurrencies';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  selectCrypto(item: CryptoItem) {
    if (this.selected && this.selected.id === item.id) {
      // toggle off
      this.selected = null;
      this.listShifted = false;
      this.destroyWidget();
      return;
    }

    this.selected = item;
    this.listShifted = true;
    // load TradingView widget for this symbol
    const symbol = this.mapToTradingViewSymbol(item);
    this.tvLoading = true;
    this.loadTradingViewWidget(symbol)
      .catch(err => {
        console.error('TradingView load error', err);
      })
      .finally(() => {
        this.tvLoading = false;
      });
  }

  private loadTradingViewScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).TradingView) return resolve();
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  private async loadTradingViewWidget(symbol: string) {
    await this.loadTradingViewScript();
    this.destroyWidget();
    const container = this.chartContainer?.nativeElement || document.getElementById('tv-chart');
    if (!container) return;
    // create a unique id if not present
    if (!container.id) container.id = 'tv-chart';
    // TradingView.widget returns an instance; keep reference if available
    try {
      // @ts-ignore
      this.tvWidget = new (window as any).TradingView.widget({
        container_id: container.id,
        autosize: true,
        symbol: symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        toolbar_bg: '#2a2e39',
        loading_screen: { backgroundColor: "#2a2e39" },
        overrides: {
          "mainSeriesProperties.candleStyle.upColor": "#26a69a",
          "mainSeriesProperties.candleStyle.downColor": "#ef5350",
          "paneProperties.background": "#2a2e39",
          "paneProperties.vertGridProperties.color": "#363c4e",
          "paneProperties.horzGridProperties.color": "#363c4e",
          "symbolWatermarkProperties.transparency": 90,
          "scalesProperties.textColor": "#AAA"
        },
        withdateranges: true,
        allow_symbol_change: true,
        details: true,
        hotlist: true,
        calendar: true,
      });
    } catch (e) {
   
      container.innerHTML = '<p>TradingView widget could not be created.</p>';
      console.error(e);
    }
  }

  private destroyWidget() {
    try {
      if (this.tvWidget && typeof this.tvWidget.remove === 'function') {
        this.tvWidget.remove();
      } else {
        const container = this.chartContainer?.nativeElement || document.getElementById('tv-chart');
        if (container) container.innerHTML = '';
      }
    } catch (e) { /* ignore */ }
    this.tvWidget = null;
  }

  private mapToTradingViewSymbol(item: CryptoItem): string {
    const id = item.id.toLowerCase();
    const sym = item.symbol.toUpperCase();
    if (this.tradingViewMap[id]) return this.tradingViewMap[id];
   
    const trySymbols = [
      `COINBASE:${sym}USD`,
      `BINANCE:${sym}USD`,
      `BINANCE:${sym}USDT`,
      `COINBASE:${sym}USDT`
    ];

    return trySymbols[0];
  }
}

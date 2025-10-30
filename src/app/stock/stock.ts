import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService, StockQuote } from '../services/stock.service';

interface StockIndex {
  name: string;
  symbol: string;
}

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock.html',
  styleUrls: ['./stock.css']
})
export class StockComponent implements OnInit {
  stockIndices: StockIndex[] = [
    { name: 'S&P 500', symbol: '^GSPC' },
    { name: 'Nasdaq 100', symbol: '^NDX' },
    { name: 'Dow Jones', symbol: '^DJI' },
    { name: 'Euro Stoxx 50', symbol: '^STOXX50E' },
    { name: 'FTSE 100', symbol: '^FTSE' },
    { name: 'Nikkei 225', symbol: '^N225' },
    { name: 'DAX', symbol: '^GDAXI' },
    { name: 'Hang Seng', symbol: '^HSI' },
    { name: 'CAC 40', symbol: '^FCHI' },
    { name: 'IBEX 35', symbol: '^IBEX' },
    { name: 'S&P/TSX Composite', symbol: '^GSPTSE' },
    { name: 'SMI (Switzerland)', symbol: '^SSMI' },
    { name: 'ASX 200 (Australia)', symbol: '^AXJO' },
    { name: 'KOSPI (South Korea)', symbol: '^KS11' },
    { name: 'Sensex (India)', symbol: '^BSESN' },
    { name: 'Bovespa (Brazil)', symbol: '^BVSP' },
    { name: 'IPC Mexico', symbol: '^MXX' },
    { name: 'Shanghai Composite', symbol: '^SSEC' },
    { name: 'Russell 2000', symbol: '^RUT' }
  ];

  selectedStock: StockIndex | null = null;
  @ViewChild('stockChartContainer', { static: false }) stockChartContainer!: ElementRef<HTMLDivElement>;
  stockWidget: any = null;
  stockQuotesMap: { [symbol: string]: StockQuote } = {};
  isLoading = true;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.loadStockData();
  }

  private loadStockData() {
    const fmpSymbols = this.stockIndices.map(idx => idx.symbol);
    
    this.stockService.getIndexQuotes(fmpSymbols).subscribe({
      next: (quotes) => {
        quotes.forEach(q => {
          this.stockQuotesMap[q.symbol] = q;
        });
        this.isLoading = false;
        
        // Debug: ver la estructura de los datos
        if (quotes.length > 0) {
          console.log('Estructura del primer quote:', quotes[0]);
          console.log('Propiedades disponibles:', Object.keys(quotes[0]));
        }
      },
      error: (err) => {
        console.error('Error fetching stock quotes:', err);
        this.isLoading = false;
      }
    });
  }

  // Método para obtener el símbolo TradingView para el widget
 getTradingViewSymbol(fmpSymbol: string): string | null {
  const symbolMap: Record<string, string> = {
    // Mapeos que sabes que funcionan
    '^GSPC': 'SPX',
    '^NDX': 'NASDAQ:NDX',
    '^DJI': 'DJI',
    '^STOXX50E': 'TVC:EUR_STOXX50',  // ejemplo, debes verificar con TradingView
    '^FTSE': 'FTSE:UKX',
    '^N225': 'TVC:NIKKEI',
    '^GDAXI': 'DE40',  // DAX
    '^HSI': 'HK50',
    '^FCHI': 'FR40',
    '^IBEX': 'ES35',
    '^GSPTSE': 'TVC:TSX',
    '^SSMI': 'SWI20',
    '^AXJO': 'ASX:AS51',
    '^KS11': 'KOSPI',
    '^BSESN': 'TVC:SENSEX',
    '^BVSP': 'TVC:BVSP',
    '^MXX': 'TVC:IPC',
    '^SSEC': 'TVC:SSEC',
    '^RUT': 'RUT'
  };

  if (symbolMap[fmpSymbol]) {
    return symbolMap[fmpSymbol];
  } else {
    console.warn(`No mapping para ${fmpSymbol}.`);
    return null; // o devolver el mismo fmpSymbol si quieres intentar directo
  }
    return symbolMap[fmpSymbol] || fmpSymbol;
  }

  selectStockIndex(index: StockIndex) {
    if (this.selectedStock?.symbol === index.symbol) {
      this.selectedStock = null;
      this.destroyStockWidget();
      return;
    }
    this.selectedStock = index;
    this.loadStockWidget(index.symbol);
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

  private async loadStockWidget(fmpSymbol: string) {
    try {
      await this.loadTradingViewScript();
      this.destroyStockWidget();
      
      const container = this.stockChartContainer?.nativeElement || document.getElementById('tv-stock-chart');
      if (!container) return;
      
      if (!container.id) container.id = 'tv-stock-chart';
      
      const tradingViewSymbol = this.getTradingViewSymbol(fmpSymbol);
      
      // @ts-ignore
      this.stockWidget = new (window as any).TradingView.widget({
        container_id: container.id,
        autosize: true,
        symbol: tradingViewSymbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#2a2e39',
        loading_screen: { backgroundColor: '#2a2e39' },
        overrides: {
          'mainSeriesProperties.candleStyle.upColor': '#26a69a',
          'mainSeriesProperties.candleStyle.downColor': '#ef5350',
          'paneProperties.background': '#2a2e39',
          'paneProperties.vertGridProperties.color': '#363c4e',
          'paneProperties.horzGridProperties.color': '#363c4e',
          'symbolWatermarkProperties.transparency': 90,
          'scalesProperties.textColor': '#AAA'
        },
        withdateranges: true,
        allow_symbol_change: true,
        details: true,
        hotlist: true,
        calendar: true,
        studies: ['RSI@tv-basicstudies'],
        width: '100%',
        height: '100%'
      });
    } catch (e) {
      const container = this.stockChartContainer?.nativeElement || document.getElementById('tv-stock-chart');
      if (container) {
        container.innerHTML = '<p class="text-center p-3">TradingView widget could not be created.</p>';
      }
      console.error('Error creating TradingView widget:', e);
    }
  }

  private destroyStockWidget() {
    try {
      if (this.stockWidget && typeof this.stockWidget.remove === 'function') {
        this.stockWidget.remove();
      } else {
        const container = this.stockChartContainer?.nativeElement || document.getElementById('tv-stock-chart');
        if (container) container.innerHTML = '';
      }
    } catch (e) { 
      console.error('Error destroying widget:', e);
    }
    this.stockWidget = null;
  }

  // Métodos para el template - VERSIÓN ROBUSTA
  getStockPrice(symbol: string): string {
    const quote = this.stockQuotesMap[symbol];
    
    // Diferentes nombres posibles para el precio
    const price = quote?.price;
    
    if (price === undefined || price === null) return '-';
    return price.toFixed(2);
  }

  getStockChangePercent(symbol: string): string {
    const quote = this.stockQuotesMap[symbol];
    
    // Diferentes nombres posibles para el cambio porcentual
    const changePercent = quote?.changesPercentage || quote?.changesPercentage || quote?.percentChange;
    
    if (changePercent === undefined || changePercent === null) return '-';
    
    return changePercent > 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`;
  }

  getStockChange(symbol: string): string {
    const quote = this.stockQuotesMap[symbol];
    
    // Diferentes nombres posibles para el cambio absoluto
    const change = quote?.percentChange || quote?.changeAmount;
    
    if (change === undefined || change === null) return '-';
    
    return change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  }

  // Métodos para determinar si es positivo/negativo
  isPositiveChange(symbol: string): boolean {
    const quote = this.stockQuotesMap[symbol];
    const changePercent = quote?.changesPercentage || quote?.changesPercentage || quote?.percentChange;
    return changePercent > 0;
  }

  isNegativeChange(symbol: string): boolean {
    const quote = this.stockQuotesMap[symbol];
    const changePercent = quote?.changesPercentage || quote?.changesPercentage || quote?.percentChange;
    return changePercent < 0;
  }

  // Método para verificar si hay datos disponibles
  hasQuoteData(symbol: string): boolean {
    return !!this.stockQuotesMap[symbol];
  }

  // Método para recargar datos
  refreshData() {
    this.isLoading = true;
    this.stockQuotesMap = {};
    this.loadStockData();
  }

  // Método para debuggear la estructura de un quote específico
  debugQuoteStructure(symbol: string) {
    const quote = this.stockQuotesMap[symbol];
    console.log(`Estructura para ${symbol}:`, quote);
    if (quote) {
      console.log('Propiedades:', Object.keys(quote));
    }
    return quote;
  }
}
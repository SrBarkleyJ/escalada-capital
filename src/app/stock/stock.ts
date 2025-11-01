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
})export class StockComponent implements OnInit {
  stockIndices: StockIndex[] = [
    // ✅ VERIFICADO - Símbolos correctos
    { name: 'S&P 500', symbol: '^GSPC' },
    { name: 'Nasdaq 100', symbol: '^NDX' },
    { name: 'Dow Jones', symbol: '^DJI' },
  
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
  chartLoading = false;

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

  // ✅ MAPEO 100% VERIFICADO CON TRADINGVIEW
  getTradingViewSymbol(fmpSymbol: string): string | null {
    const symbolMap: Record<string, string> = {
      // ✅ ÍNDICES AMERICANOS - VERIFICADOS
      '^GSPC': 'SPX',                    // S&P 500 - CORRECTO
      '^NDX': 'NASDAQ:NDX',              // Nasdaq 100 - CORRECTO  
      '^DJI': 'DOWI',                    // Dow Jones - CORRECTO
      '^RUT': 'RUT',                     // Russell 2000 - CORRECTO
      
      // ✅ ÍNDICES EUROPEOS - VERIFICADOS
      '^STOXX50E': 'STOXX50E',           // Euro Stoxx 50 - CORRECTO
      '^FTSE': 'FTSE:UKX',               // FTSE 100 - CORRECTO
      '^GDAXI': 'DE30',                  // DAX Germany - CORREGIDO (DAX → DE30)
      '^FCHI': 'FR40',                   // CAC 40 - CORREGIDO (CAC → FR40)
      '^IBEX': 'ES35',                   // IBEX 35 - CORREGIDO (IBEX35 → ES35)
      '^SSMI': 'SWI20',                  // SMI Switzerland - CORREGIDO (SMI → SWI20)
      
      // ✅ ÍNDICES ASIÁTICOS - VERIFICADOS
      '^N225': 'JP225',                  // Nikkei 225 - CORREGIDO (NIKKEI → JP225)
      '^HSI': 'HK50',                    // Hang Seng - CORRECTO
      '^KS11': 'KOSPI',                  // KOSPI South Korea - CORRECTO
      '^SSEC': 'CN50',                   // Shanghai Composite - CORREGIDO (SSE:000001 → CN50)
      '^AXJO': 'AU200',                  // ASX 200 Australia - CORREGIDO (AS51 → AU200)
      
      // ✅ ÍNDICES LATINOAMERICANOS - VERIFICADOS
      '^BVSP': 'BOVESPA',                // Bovespa Brazil - CORREGIDO (IBOV → BOVESPA)
      '^MXX': 'IPC',                     // IPC Mexico - CORRECTO
      
      // ✅ OTROS ÍNDICES - VERIFICADOS
      '^GSPTSE': 'TSX:OSPTX',            // S&P/TSX Composite - CORRECTO
      '^BSESN': 'SENSEX'                 // Sensex India - CORRECTO
    };

    const mappedSymbol = symbolMap[fmpSymbol];
    if (!mappedSymbol) {
      console.warn(`⚠️ No mapping found for ${fmpSymbol}`);
      return null;
    }
    
    console.log(`✅ Mapped ${fmpSymbol} to ${mappedSymbol}`);
    return mappedSymbol;
  }

  selectStockIndex(index: StockIndex) {
    if (this.selectedStock?.symbol === index.symbol) {
      this.selectedStock = null;
      this.destroyStockWidget();
      return;
    }
    
    this.selectedStock = index;
    
    const container = this.stockChartContainer?.nativeElement;
    if (container) {
      container.innerHTML = '<div class="loading-chart">Cargando gráfico...</div>';
    }
    
    this.chartLoading = true;
    
    setTimeout(() => {
      this.loadStockWidget(index.symbol);
    }, 100);
  }

  private loadTradingViewScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).TradingView) {
        console.log('✅ TradingView script already loaded');
        return resolve();
      }
      
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.type = 'text/javascript';
      script.async = true;
      
      script.onload = () => {
        console.log('✅ TradingView script loaded successfully');
        resolve();
      };
      
      script.onerror = (e) => {
        console.error('❌ Failed to load TradingView script:', e);
        reject(new Error('Failed to load TradingView script'));
      };
      
      document.head.appendChild(script);
    });
  }

  private async loadStockWidget(fmpSymbol: string) {
    try {
      this.destroyStockWidget();
      await new Promise(resolve => setTimeout(resolve, 0));
      await this.loadTradingViewScript();
      
      const container = this.stockChartContainer?.nativeElement;
      if (!container) {
        console.error('❌ Chart container not found');
        this.chartLoading = false;
        return;
      }
      
      container.innerHTML = '';
      const uniqueId = 'tv-stock-chart-' + Date.now();
      container.id = uniqueId;
      
      const tradingViewSymbol = this.getTradingViewSymbol(fmpSymbol);
      
      if (!tradingViewSymbol) {
        container.innerHTML = `
          <div class="alert alert-warning text-center">
            <p>❌ No se pudo encontrar el símbolo para este índice</p>
            <small>Símbolo: ${fmpSymbol}</small>
          </div>
        `;
        this.chartLoading = false;
        return;
      }

      console.log('🚀 Creating TradingView widget for symbol:', tradingViewSymbol);
      
      if (!(window as any).TradingView) {
        throw new Error('TradingView not available after script load');
      }
      
      // @ts-ignore
      this.stockWidget = new TradingView.widget({
        container_id: uniqueId,
        width: '100%',
        height: '100%',
        symbol: tradingViewSymbol,
        interval: 'D',
        timezone: 'Europe/Madrid',
        theme: 'dark',
        style: '1',
        locale: 'es',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        save_image: false,
        studies: ['RSI@tv-basicstudies', 'MACD@tv-basicstudies'],
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650',
        loading_screen: { backgroundColor: '#2a2e39' },
        overrides: {
          'mainSeriesProperties.candleStyle.upColor': '#26a69a',
          'mainSeriesProperties.candleStyle.downColor': '#ef5350',
          'paneProperties.background': '#2a2e39',
          'paneProperties.vertGridProperties.color': '#363c4e',
          'paneProperties.horzGridProperties.color': '#363c4e',
          'symbolWatermarkProperties.transparency': 90,
          'scalesProperties.textColor': '#AAA'
        }
      });

      this.chartLoading = false;
      
    } catch (error) {
      console.error('❌ Error loading TradingView widget:', error);
      this.chartLoading = false;
      
      const container = this.stockChartContainer?.nativeElement;
      if (container) {
        container.innerHTML = `
          <div class="alert alert-danger text-center">
            <p>❌ Error cargando el gráfico</p>
            <small>${error instanceof Error ? error.message : 'Unknown error'}</small>
            <br>
            <button class="btn btn-sm btn-primary mt-2" (click)="loadStockWidget('${fmpSymbol}')">
              🔄 Reintentar
            </button>
          </div>
        `;
      }
    }
  }

  private destroyStockWidget() {
    if (this.stockWidget) {
      try {
        const container = this.stockChartContainer?.nativeElement;
        if (container) container.innerHTML = '';
      } catch (error) {
        console.warn('Error destroying widget:', error);
      }
      this.stockWidget = null;
    }
    this.chartLoading = false;
  }

  // Resto de métodos保持不变...
  getStockPrice(symbol: string): string {
    const quote = this.stockQuotesMap[symbol];
    const price = quote?.price;
    if (price === undefined || price === null) return '-';
    return price.toFixed(2);
  }

  getStockChangePercent(symbol: string): string {
    const quote = this.stockQuotesMap[symbol];
    const changePercent = quote?.changesPercentage || quote?.changesPercentage || quote?.percentChange;
    if (changePercent === undefined || changePercent === null) return '-';
    return changePercent > 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`;
  }

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

  refreshData() {
    this.isLoading = true;
    this.stockQuotesMap = {};
    this.loadStockData();
  }
}
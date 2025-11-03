import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService, StockQuote } from '../services/stock.service';

interface StockProfile {
  name: string;
  symbol: string;
  country: string;
  currency: string;
  exchange: string;
  companyName: string;
}

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock.html',
  styleUrls: ['./stock.css']
})
export class StockComponent implements OnInit {

  stockIndices: StockProfile[] = [
    // ✅ AMERICANOS
    { 
      name: 'S&P 500', 
      symbol: '^GSPC', 
      country: 'US', 
      currency: 'USD', 
      exchange: 'NASDAQ', 
      companyName: 'S&P 500 Index' 
    },
    { 
      name: 'Nasdaq 100', 
      symbol: '^NDX', 
      country: 'US', 
      currency: 'USD', 
      exchange: 'NASDAQ', 
      companyName: 'Nasdaq 100 Index' 
    },
    { 
      name: 'Dow Jones', 
      symbol: '^DJI', 
      country: 'US', 
      currency: 'USD', 
      exchange: 'NYSE', 
      companyName: 'Dow Jones Industrial Average' 
    },
    { 
      name: 'Russell 2000', 
      symbol: '^RUT', 
      country: 'US', 
      currency: 'USD', 
      exchange: 'NYSE', 
      companyName: 'Russell 2000 Index' 
    },

    // ✅ EUROPEOS
    { 
      name: 'FTSE 100', 
      symbol: '^FTSE', 
      country: 'UK', 
      currency: 'GBP', 
      exchange: 'LSE', 
      companyName: 'FTSE 100 Index' 
    },
    { 
      name: 'DAX', 
      symbol: '^GDAXI', 
      country: 'DE', 
      currency: 'EUR', 
      exchange: 'XETRA', 
      companyName: 'DAX Performance Index' 
    },
    { 
      name: 'CAC 40', 
      symbol: '^FCHI', 
      country: 'FR', 
      currency: 'EUR', 
      exchange: 'EURONEXT', 
      companyName: 'CAC 40 Index' 
    },
    { 
      name: 'IBEX 35', 
      symbol: '^IBEX', 
      country: 'ES', 
      currency: 'EUR', 
      exchange: 'BME', 
      companyName: 'IBEX 35 Index' 
    },
    { 
      name: 'SMI (Switzerland)', 
      symbol: '^SSMI', 
      country: 'CH', 
      currency: 'CHF', 
      exchange: 'SIX', 
      companyName: 'Swiss Market Index' 
    },

    // ✅ ASIÁTICOS
    { 
      name: 'Nikkei 225', 
      symbol: '^N225', 
      country: 'JP', 
      currency: 'JPY', 
      exchange: 'TSE', 
      companyName: 'Nikkei 225 Index' 
    },
    { 
      name: 'Hang Seng', 
      symbol: '^HSI', 
      country: 'HK', 
      currency: 'HKD', 
      exchange: 'HKEX', 
      companyName: 'Hang Seng Index' 
    },
    { 
      name: 'Shanghai Composite', 
      symbol: '^SSEC', 
      country: 'CN', 
      currency: 'CNY', 
      exchange: 'SSE', 
      companyName: 'Shanghai Composite Index' 
    },
    { 
      name: 'KOSPI (South Korea)', 
      symbol: '^KS11', 
      country: 'KR', 
      currency: 'KRW', 
      exchange: 'KRX', 
      companyName: 'KOSPI Index' 
    },
    { 
      name: 'ASX 200 (Australia)', 
      symbol: '^AXJO', 
      country: 'AU', 
      currency: 'AUD', 
      exchange: 'ASX', 
      companyName: 'S&P/ASX 200 Index' 
    },
    { 
      name: 'Sensex (India)', 
      symbol: '^BSESN', 
      country: 'IN', 
      currency: 'INR', 
      exchange: 'BSE', 
      companyName: 'S&P BSE Sensex' 
    },

    // ✅ LATINOAMERICANOS
    { 
      name: 'Bovespa (Brazil)', 
      symbol: '^BVSP', 
      country: 'BR', 
      currency: 'BRL', 
      exchange: 'B3', 
      companyName: 'IBOVESPA Index' 
    },
    { 
      name: 'IPC Mexico', 
      symbol: '^MXX', 
      country: 'MX', 
      currency: 'MXN', 
      exchange: 'BMV', 
      companyName: 'IPC Mexico Index' 
    },
    { 
      name: 'S&P/TSX Composite', 
      symbol: '^GSPTSE', 
      country: 'CA', 
      currency: 'CAD', 
      exchange: 'TSX', 
      companyName: 'S&P/TSX Composite Index' 
    }
  ];

  selectedStock: StockProfile | null = null;
  @ViewChild('stockChartContainer', { static: false }) stockChartContainer!: ElementRef<HTMLDivElement>;
  stockWidget: any = null;
  stockQuotesMap: { [symbol: string]: StockQuote } = {};
  isLoading = true;
  chartLoading = false;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.loadStockData();
  }

  // Método para obtener el nombre del país completo
  getCountryName(countryCode: string): string {
    const countryNames: {[key: string]: string} = {
      'US': 'Estados Unidos',
      'UK': 'Reino Unido', 
      'DE': 'Alemania',
      'FR': 'Francia',
      'ES': 'España',
      'CH': 'Suiza',
      'JP': 'Japón',
      'HK': 'Hong Kong',
      'CN': 'China',
      'KR': 'Corea del Sur',
      'AU': 'Australia',
      'IN': 'India',
      'BR': 'Brasil',
      'MX': 'México',
      'CA': 'Canadá'
    };
    
    return countryNames[countryCode] || countryCode;
  }

  // Método para obtener la bandera (opcional)
  // En tu componente
getCountryFlag(countryCode: string): string {
  const flagUrls: {[key: string]: string} = {
    'US': 'https://flagcdn.com/w40/us.png',
    'UK': 'https://flagcdn.com/w40/gb.png',
    'DE': 'https://flagcdn.com/w40/de.png',
    'FR': 'https://flagcdn.com/w40/fr.png',
    'ES': 'https://flagcdn.com/w40/es.png',
    'CH': 'https://flagcdn.com/w40/ch.png',
    'JP': 'https://flagcdn.com/w40/jp.png',
    'HK': 'https://flagcdn.com/w40/hk.png',
    'CN': 'https://flagcdn.com/w40/cn.png',
    'KR': 'https://flagcdn.com/w40/kr.png',
    'AU': 'https://flagcdn.com/w40/au.png',
    'IN': 'https://flagcdn.com/w40/in.png',
    'BR': 'https://flagcdn.com/w40/br.png',
    'MX': 'https://flagcdn.com/w40/mx.png',
    'CA': 'https://flagcdn.com/w40/ca.png'
  };
  
  return flagUrls[countryCode] || '';
}
  private loadStockData() {
    const fmpSymbols = this.stockIndices.map(idx => idx.symbol);
    
    this.stockService.getIndexQuotes(fmpSymbols).subscribe({
      next: (quotes) => {
        console.log('✅ Datos recibidos del servicio:', quotes);
        
        quotes.forEach(q => {
          console.log(`📊 ${q.symbol}: $${q.price} | ${q.changesPercentage}%`);
          this.stockQuotesMap[q.symbol] = q;
        });
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching stock quotes:', err);
        this.isLoading = false;
      }
    });
  }

  // Los demás métodos permanecen igual...
  getTradingViewSymbol(fmpSymbol: string): string | null {
    const symbolMap: Record<string, string> = {
      '^GSPC': 'SPX', '^NDX': 'NASDAQ:NDX', '^DJI': 'DOWI', '^RUT': 'RUT',
      '^FTSE': 'FTSE:UKX', '^GDAXI': 'DE30', '^FCHI': 'FR40', '^IBEX': 'ES35',
      '^SSMI': 'SWI20', '^N225': 'JP225', '^HSI': 'HK50', '^KS11': 'KOSPI',
      '^SSEC': 'CN50', '^AXJO': 'AU200', '^BVSP': 'BOVESPA', '^MXX': 'IPC',
      '^GSPTSE': 'TSX:OSPTX', '^BSESN': 'SENSEX'
    };

    return symbolMap[fmpSymbol] || null;
  }

  selectStockIndex(index: StockProfile) {
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

  // Los métodos restantes (loadTradingViewScript, loadStockWidget, destroyStockWidget, etc.)
  // permanecen exactamente igual que en tu código anterior...

  getStockPrice(symbol: string): string {
    const quote = this.stockQuotesMap[symbol];
    if (!quote) return '-';
    return quote.price ? quote.price.toFixed(2) : '-';
  }

  getStockChangePercent(symbol: string): string {
    const quote = this.stockQuotesMap[symbol];
    if (!quote) return '-';
    const changePercent = quote.changesPercentage;
    if (changePercent === undefined || changePercent === null) return '-';
    return changePercent > 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`;
  }

  isPositiveChange(symbol: string): boolean {
    const quote = this.stockQuotesMap[symbol];
    if (!quote) return false;
    return quote.changesPercentage > 0;
  }

  isNegativeChange(symbol: string): boolean {
    const quote = this.stockQuotesMap[symbol];
    if (!quote) return false;
    return quote.changesPercentage < 0;
  }

  refreshData() {
    this.isLoading = true;
    this.stockQuotesMap = {};
    this.loadStockData();
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

  

  getStockChange(symbol: string): string {
    const quote = this.stockQuotesMap[symbol];
    if (!quote) return '-';
    
    // Si necesitas el cambio absoluto en lugar del porcentaje
    const change = quote.changeAmount;
    if (change === undefined || change === null) return '-';
    return change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  }
}
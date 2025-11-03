import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from "./personal/personal";
import { StockComponent } from './stock/stock';
import { CryptoComponent } from './crypto/crypto';
import { Terms } from "./terms/terms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    PersonalComponent,
    CryptoComponent,
    StockComponent,
    Terms
],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Usando signals (moderno) o propiedades tradicionales
  activeSection = signal<string>('stock'); // Valor inicial
  
  // O con propiedad tradicional:
  // activeSection = 'stock';

  showSection(section: string) {
    this.activeSection.set(section);
    
    // O con propiedad tradicional:
    // this.activeSection = section;
  }
}
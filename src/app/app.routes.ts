import { Routes } from '@angular/router';
import { CryptoComponent } from './crypto/crypto';
import { PersonalComponent } from './personal/personal';
import { NewsComponent } from './news/news';
import { Terms } from './terms/terms';
import { StockComponent } from './stock/stock';

export const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'stocks', component: StockComponent, title: 'Índices Bursátiles - Escalada Capital' },
  { path: 'crypto', component: CryptoComponent, title: 'Criptomonedas - Escalada Capital' },
  { path: 'news', component: NewsComponent, title: 'Noticias Financieras - Escalada Capital' },
  { path: 'about', component: PersonalComponent, title: 'Quiénes Somos - Escalada Capital' },
  { path: 'terms', component: Terms, title: 'Términos y Privacidad - Escalada Capital' },
  { path: '**', redirectTo: '/about' }
];

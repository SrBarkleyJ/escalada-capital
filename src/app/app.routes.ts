import { Routes } from '@angular/router';
import { CryptoComponent } from './crypto/crypto';
import { PersonalComponent } from './personal/personal';

export const routes: Routes = [
  { path: 'crypto', component: CryptoComponent },
  { path: '', redirectTo: '/crypto', pathMatch: 'full' },
  {path: 'personal', redirectTo: '/personal', pathMatch: 'full'}
];

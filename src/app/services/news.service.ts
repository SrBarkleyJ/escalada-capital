import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  categoria: string;
  fecha: string;
  imagen: string;
  destacada: boolean;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<{noticias: Noticia[]}>('/assets/data/news.json').pipe(
      map(data => data.noticias),
      catchError(error => {
        console.error('Error cargando noticias mockup:', error);
        return of(this.getNoticiasFallback());
      })
    );
  }

  getNoticiasDestacadas(): Observable<Noticia[]> {
    return this.getNoticias().pipe(
      map(noticias => noticias.filter(n => n.destacada))
    );
  }

  getNoticiasPorCategoria(categoria: string): Observable<Noticia[]> {
    return this.getNoticias().pipe(
      map(noticias => noticias.filter(n => n.categoria === categoria))
    );
  }

  private getNoticiasFallback(): Noticia[] {
    // Datos de fallback por si el JSON no carga
    return [
      {
        id: 1,
        titulo: "Mercados en alza generalizada",
        resumen: "Los principales índices muestran tendencia alcista esta semana.",
        categoria: "general",
        fecha: new Date().toISOString().split('T')[0],
        imagen: "📊",
        destacada: true,
        tags: ["mercados", "índices"]
      }
    ];
  }
}
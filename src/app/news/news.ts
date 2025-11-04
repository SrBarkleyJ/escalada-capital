import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService, Noticia } from '../services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrls: ['./news.css']
})
export class NewsComponent implements OnInit {
  noticias: Noticia[] = [];
  noticiasFiltradas: Noticia[] = [];
  categorias: string[] = ['todas', 'mercados', 'cripto', 'economia', 'europa', 'asia', 'espana'];
  categoriaSeleccionada = 'todas';
  isLoading = true;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.newsService.getNoticias().subscribe({
      next: (noticias) => {
        this.noticias = noticias;
        this.noticiasFiltradas = noticias;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  getCategoriaDisplayName(categoria: string): string {
  const nombres: {[key: string]: string} = {
    'todas': '📰 Todas',
    'mercados': '📈 Mercados', 
    'cripto': '₿ Cripto',
    'economia': '🏦 Economía',
    'europa': '🇪🇺 Europa',
    'asia': '🌏 Asia',
    'espana': '🇪🇸 España'
  };
  return nombres[categoria] || categoria;
}
  filtrarPorCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    
    if (categoria === 'todas') {
      this.noticiasFiltradas = this.noticias;
    } else {
      this.newsService.getNoticiasPorCategoria(categoria).subscribe(
        noticias => this.noticiasFiltradas = noticias
      );
    }
  }

  getNoticiasRecientes(): Noticia[] {
    return this.noticias
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, 3);
  }
}
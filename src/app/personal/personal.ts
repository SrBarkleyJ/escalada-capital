import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  position: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal.html',
  styleUrls: ['./personal.css']
})
export class PersonalComponent {
  // Imágenes base64 como fallback
  teamMembers: TeamMember[] = [
    {
      name: 'Juan Pérez',
      position: 'CEO & Fundador',
      description: 'Más de 10 años de experiencia en el sector financiero.',
      image: 'assets/images/juan.jpg'
    },
    {
      name: 'María García',
      position: 'Directora de Tecnología',
      description: 'Especialista en desarrollo de software.',
      image: 'assets/images/maria.jpg'
    },
    {
      name: 'Carlos López',
      position: 'Analista Financiero Senior',
      description: 'Analista de mercados con expertise en índices bursátiles.',
      image: 'assets/images/carlos.jpg'
    },
    {
      name: 'Ana Rodríguez',
      position: 'Diseñadora UX/UI',
      description: 'Creadora de experiencias de usuario intuitivas.',
      image: 'assets/images/ana.jpg'
    },
    {
      name: 'David Chen',
      position: 'Desarrollador Full Stack',
      description: 'Experto en Angular y tecnologías web modernas.',
      image: 'assets/images/david.jpg'
    },
    {
      name: 'Laura Martínez',
      position: 'Responsable de Datos',
      description: 'Científica de datos especializada en análisis financiero.',
      image: 'assets/images/laura.jpg'
    }
  ];
  defaultAvatar: any;
 ngOnInit() {
    console.log('🔄 Iniciando componente Personal');
    console.log('📁 Ruta base:', window.location.origin);
    
    this.teamMembers.forEach((member, index) => {
      const fullUrl = `${window.location.origin}/${member.image}`;
      console.log(`👤 ${member.name}:`);
      console.log(`   Ruta relativa: ${member.image}`);
      console.log(`   Ruta absoluta: ${fullUrl}`);
      
      // Verificación en tiempo real
      this.verifyImage(member.image, member.name);
    });
  }

  verifyImage(imageUrl: string, memberName: string) {
    const img = new Image();
    img.onload = () => {
      console.log(`✅ ${memberName}: IMAGEN ENCONTRADA Y CARGADA`);
    };
    img.onerror = () => {
      console.log(`❌ ${memberName}: NO SE PUEDE CARGAR LA IMAGEN`);
      console.log(`   Probando URL: ${window.location.origin}/${imageUrl}`);
    };
    img.src = imageUrl;
  }

  onImageError(event: any, memberName: string, originalSrc: string) {
    console.log(`🚨 ERROR en UI: ${memberName}`);
    console.log(`   URL fallida: ${originalSrc}`);
    
    // Fallback inmediato
    event.target.src = this.defaultAvatar;
    event.target.style.border = '3px solid #dc3545'; // Borde rojo para debug
  }
}

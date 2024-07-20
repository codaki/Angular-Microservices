import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ICurso, ICursoUsuario, IUsuario } from './model/usuario';
import { EstudiantesPageComponent } from "./estudiantes-page/estudiantes-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EstudiantesPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'matricula';
  masterService = inject(MasterService);

  cursos: ICursoUsuario[] = [];
  relacion: ICurso[] = [];
  usuarios: IUsuario[] = [];

  id: number = 0;
  ngOnInit(): void {
    this.loadCursos();
    this.loadUsuarios();
  }
  loadCursos() {
    this.masterService.getCursos().subscribe((res: ICursoUsuario[]) => {
      console.log(res);
      this.cursos = res;
      this.relacion = res[0].cursoUsuario;
    });
  }
  loadUsuarios() {
    this.masterService.getUsuarios().subscribe((res: IUsuario[]) => {
      console.log(res);
      this.usuarios = res;
    });
  }
}

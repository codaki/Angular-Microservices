import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterService } from '../Service/master.service';
import { IUsuario, CUsuario, ICurso, CCurso, ICursoUsuario, ICursoCompleto, CCursoCompleto } from '../model/usuario';
import { FormsModule } from '@angular/forms';

declare const bootstrap: any;

@Component({
  selector: 'app-relacion-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './relacion-page.component.html',
  styleUrl: './relacion-page.component.css'
})

export class RelacionPageComponent implements OnInit {
  @ViewChild('cursoModal') cursoModal?: ElementRef;
  cursos: ICurso[] = [];
  usuariosMatriculados: IUsuario[] = [];
  usuarios: IUsuario[] = [];
  curso: CCurso = new CCurso();
  cursoId: number = 0;

  cursosCompletos: ICursoCompleto[] = [];

  ngOnInit(): void {
    this.loadCursos();
    this.loadUsuarios();
    this.loadCursosCompletos();
  }

  masterService = inject(MasterService);

  loadCursosCompletos() {
    this.masterService.getCursosCompletos().subscribe((res: ICursoCompleto[]) => {
      this.cursosCompletos = res;
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  getUsuarioNombre(usuarioId: number): string {
    const usuario = this.usuarios.find(user => user.id === usuarioId);
    return usuario ? usuario.nombre : 'Desconocido';
  }

  loadCursos() {
    this.masterService.getCursos().subscribe((res: ICurso[]) => {
      this.cursos = res;
    });
  }

  loadUsuarios() {
    this.masterService.getUsuarios().subscribe((res: IUsuario[]) => {
      this.usuarios = res;
    });
  }

  loadEstudiantes(idCurso: number): void {
    this.masterService.getUsuariosNoMatriculados(idCurso).subscribe(data => {
      this.usuariosMatriculados = data;
    });
  }

  onUpdateCurso(curso: CCurso, id: number) {
    this.curso = curso;
    this.cursoId = id;
    this.loadEstudiantes(id);
  }

  closeModal() {
    const modalElement = this.cursoModal?.nativeElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    this.curso = new CCurso();
    this.cursoId = 0;
    this.usuariosMatriculados = [];
  }


  matricularEstudiante(estudianteId: number): void {
    const usuario = this.usuarios.find(e => e.id === estudianteId);
    if (usuario) {
      this.masterService.asignarUsuario(this.cursoId, usuario).subscribe({
        next: (res) => {
          this.loadCursos();
          this.loadUsuarios();
          this.loadCursosCompletos();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al matricular estudiante:', err);
          alert('Ocurrió un error al matricular el estudiante. Por favor, inténtelo de nuevo.');
        }
      }
      );
    }
  }

  desmatricularEstudiante(estudianteId: number, cursoId: number): void {
    const usuario = this.usuarios.find(e => e.id === estudianteId);
    if (usuario) {
      this.masterService.desasignarUsuario(cursoId, usuario).subscribe({
        next: (res) => {
          this.loadCursos();
          this.loadUsuarios();
          this.loadCursosCompletos();
        },
        error: (err) => {
          console.error('Error al desmatricular estudiante:', err);
          alert('Ocurrió un error al desmatricular el estudiante. Por favor, inténtelo de nuevo.');
        }
      }
      );
    }
  }
}
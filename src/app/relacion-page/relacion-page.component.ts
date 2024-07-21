import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterService } from '../Service/master.service';
import { IUsuario, CUsuario,ICurso,CCurso } from '../model/usuario';
import { FormsModule } from '@angular/forms';

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
  usuarios: IUsuario[] = [];
  curso: CCurso = new CCurso();
  cursoId: number = 0;

  ngOnInit(): void {
    this.loadCursos();
    this.loadEstudiantes();
  }

  masterService = inject(MasterService);
  loadCursos() {
    this.masterService.getCursos().subscribe((res: ICurso[]) => {
      console.log(res);
      this.cursos = res;
    });
  }
  loadEstudiantes(): void {
    this.masterService.getUsuariosNoMatriculados().subscribe(data => {
      this.usuarios = data; // Asigna los estudiantes obtenidos a la variable
    });
  }
  addCurso() {
    this.masterService.addCurso(this.curso).subscribe({
      next: (res: CCurso) => {
        console.log(res);
        this.loadCursos();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al añadir curso:', err);
        alert('Ocurrió un error al añadir el curso. Por favor, verifique que el nombre del curso no exista e inténtelo de nuevo.');
      }
    });
  }
  deleteCurso(idCurso: number) {
    this.masterService.deleteCurso(idCurso).subscribe(() => {
      console.log("Curso eliminado");
      this.loadCursos();
    });
  }
  updateCurso() {
    this.masterService.updateCurso(this.curso, this.cursoId).subscribe({
      next: (res: CCurso) => {
        console.log(res);
        this.loadCursos();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al modificar curso:', err);
        alert('Ocurrió un error al modificar el curso. Por favor, verifique que el nombre del curso no exista e inténtelo de nuevo.');
      }
    });
  }

  onUpdateCurso(curso: CCurso, id: number) {
    this.curso = curso;
    this.cursoId = id;
  }

  closeModal() {
    if (this.cursoModal) {
      (this.cursoModal.nativeElement as HTMLElement).classList.remove('show');
      (this.cursoModal.nativeElement as HTMLElement).setAttribute('aria-hidden', 'true');
      (this.cursoModal.nativeElement as HTMLElement).setAttribute('style', 'display: none');
      document.body.classList.remove('modal-open');
      document.body.removeChild(document.querySelector('.modal-backdrop')!);

      this.curso = new CCurso();
      this.cursoId = 0;
    }
  }


  matricularEstudiante(estudianteId: number): void {
    const usuario = this.usuarios.find(e => e.id === estudianteId);
    console.log(usuario);
    if (usuario) {
      this.masterService.asignarUsuario(this.cursoId, usuario).subscribe(
        response => {
          console.log('Estudiante matriculado con éxito', response);
          this.closeModal();
        },
        error => {
          console.error('Error matriculando al estudiante', error);
        }
      );
    }
  }
}
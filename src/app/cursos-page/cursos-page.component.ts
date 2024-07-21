import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterService } from '../Service/master.service';
import { IUsuario, CUsuario, ICurso, CCurso } from '../model/usuario';
import { FormsModule } from '@angular/forms';

declare const bootstrap: any;

@Component({
  selector: 'app-cursos-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cursos-page.component.html',
  styleUrl: './cursos-page.component.css'
})
export class CursosPageComponent implements OnInit {
  @ViewChild('cursoModal') cursoModal?: ElementRef;
  cursos: ICurso[] = [];
  curso: CCurso = new CCurso();
  cursoId: number = 0;

  ngOnInit(): void {
    this.loadCursos();
  }

  masterService = inject(MasterService);
  loadCursos() {
    this.masterService.getCursos().subscribe((res: ICurso[]) => {
      this.cursos = res;
    });
  }
  addCurso() {
    this.masterService.addCurso(this.curso).subscribe({
      next: (res: CCurso) => {
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
    this.masterService.deleteCurso(idCurso).subscribe({
      next: () => {
        alert('Curso eliminado');
        this.loadCursos();
      },
      error: (err) => {
        console.error('Error al eliminar curso:', err);
        alert('Error al eliminar curso.');
      }
    });
  }
  updateCurso() {
    this.masterService.updateCurso(this.curso, this.cursoId).subscribe({
      next: (res: CCurso) => {
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
      const modalElement = this.cursoModal?.nativeElement;
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }

      this.curso = new CCurso();
      this.cursoId = 0;
    }
  }
}

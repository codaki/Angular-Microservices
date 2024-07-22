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
  @ViewChild('alertModal') alertModal!: ElementRef;
  @ViewChild('alertPagina') alertPagina!: ElementRef;
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
        this.showBootstrapAlert('danger', 'Ocurrió un error al añadir el curso. Por favor, verifique que el nombre del curso no exista e inténtelo de nuevo.');
      }
    });
  }
  deleteCurso(idCurso: number) {
    this.masterService.deleteCurso(idCurso).subscribe({
      next: () => {
        this.showBootstrapAlertPagina('succes', 'Curso eliminado.');
        this.loadCursos();
      },
      error: (err) => {
        this.showBootstrapAlertPagina('danger', 'Error al eliminar curso.');
        console.error('Error al eliminar curso:', err);
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
        this.showBootstrapAlert('danger', 'Ocurrió un error al modificar el curso. Por favor, verifique que el nombre del curso no exista e inténtelo de nuevo.');
      }
    });
  }

  onUpdateCurso(curso: CCurso, id: number) {
    this.curso = curso;
    this.cursoId = id;
  }

  showBootstrapAlert(type: string, message: string) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`);
    alertDiv.setAttribute('role', 'alert');
    alertDiv.textContent = message;

    this.alertModal.nativeElement.innerHTML = ''; 
    this.alertModal.nativeElement.appendChild(alertDiv);

    setTimeout(() => {
      this.alertModal.nativeElement.innerHTML = '';
    }, 5000); 
  }

  showBootstrapAlertPagina(type: string, message: string) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`);
    alertDiv.setAttribute('role', 'alert');
    alertDiv.textContent = message;

    this.alertPagina.nativeElement.innerHTML = '';
    this.alertPagina.nativeElement.appendChild(alertDiv);

    setTimeout(() => {
      this.alertPagina.nativeElement.innerHTML = '';
    }, 5000); 
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

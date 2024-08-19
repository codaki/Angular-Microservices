import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterService } from '../Service/master.service';
import { IUsuario, CUsuario } from '../model/usuario';
import { FormsModule } from '@angular/forms';

declare const bootstrap: any;

@Component({
  selector: 'app-estudiantes-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './estudiantes-page.component.html',
  styleUrl: './estudiantes-page.component.css'
})
export class EstudiantesPageComponent implements OnInit {
  @ViewChild('userModal') usuarioModal?: ElementRef;
  @ViewChild('alertModal') alertModal!: ElementRef;
  @ViewChild('alertPagina') alertPagina!: ElementRef;
  usuarios: IUsuario[] = [];
  usuario: CUsuario = new CUsuario();
  usuarioId: number = 0;

  ngOnInit(): void {
    this.loadUsuarios();
  }

  masterService = inject(MasterService);
  loadUsuarios() {
    this.masterService.getUsuarios().subscribe((res: IUsuario[]) => {
      this.usuarios = res;
    });
  }
  addUsuario() {
    this.masterService.addUsuario(this.usuario).subscribe({
      next: (res: CUsuario) => {
        this.loadUsuarios();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al añadir usuario:', err);
        this.showBootstrapAlert('danger', 'Ocurrió un error al añadir el usuario. Por favor, inténtelo de nuevo.');
      }
    });
  }
  deleteUsuario(idUsario: number) {
    this.masterService.deleteUsuario(idUsario).subscribe({
      next: () => {
        this.showBootstrapAlertPagina('success', 'Usuario eliminado');
        this.loadUsuarios();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        this.showBootstrapAlertPagina('danger', 'Error al eliminar usuario.');
      }
    });
  }
  updateUsuario() {
    this.masterService.updateUsuario(this.usuario, this.usuarioId).subscribe({
      next: (res: CUsuario) => {
        this.loadUsuarios();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al modificar usuario:', err);
        this.showBootstrapAlert('danger', 'Ocurrió un error al modificar el usuario. Por favor, inténtelo de nuevo.');
      }
    });
  }

  onUpdateUsuario(usuario: CUsuario, id: number) {
    this.usuario = usuario;
    this.usuarioId = id;
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
    if (this.usuarioModal) {
      const modalElement = this.usuarioModal?.nativeElement;
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }

      this.usuario = new CUsuario();
      this.usuarioId = 0;
    }
  }
}

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
  @ViewChild('alertContainer') alertContainer!: ElementRef;
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
        this.showBootstrapAlert('success', 'Usuario eliminado');
        this.loadUsuarios();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        this.showBootstrapAlert('danger', 'Error al eliminar usuario.');
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

    // Agrega la alerta al contenedor obtenido con ViewChild
    this.alertContainer.nativeElement.innerHTML = ''; // Limpia el contenedor antes de agregar la nueva alerta
    this.alertContainer.nativeElement.appendChild(alertDiv);

    // Cierra automáticamente la alerta después de 5 segundos
    setTimeout(() => {
      this.alertContainer.nativeElement.innerHTML = '';
    }, 5000);  // Cambia el tiempo según tus necesidades
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

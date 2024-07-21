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
        alert('Ocurrió un error al añadir el usuario. Por favor, inténtelo de nuevo.');
      }
    });
  }
  deleteUsuario(idUsario: number) {
    this.masterService.deleteUsuario(idUsario).subscribe({
      next: () => {
        alert('Usuario eliminado');
        this.loadUsuarios();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        alert('Error al eliminar usuario.');
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
        alert('Ocurrió un error al modificar el usuario. Por favor, inténtelo de nuevo.');
      }
    });
  }

  onUpdateUsuario(usuario: CUsuario, id: number) {
    this.usuario = usuario;
    this.usuarioId = id;
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

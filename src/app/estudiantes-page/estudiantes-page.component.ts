import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterService } from '../Service/master.service';
import { IUsuario, CUsuario } from '../model/usuario';
import { FormsModule } from '@angular/forms';

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
      console.log(res);
      this.usuarios = res;
    });
  }
  addUsuario() {
    this.masterService.addUsuario(this.usuario).subscribe({
      next: (res: CUsuario) => {
        console.log(res);
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
    this.masterService.deleteUsuario(idUsario).subscribe(() => {
      console.log("Usuario eliminado");
      this.loadUsuarios();
    });
  }
  updateUsuario() {
    this.masterService.updateUsuario(this.usuario, this.usuarioId).subscribe({
      next: (res: CUsuario) => {
        console.log(res);
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
      (this.usuarioModal.nativeElement as HTMLElement).classList.remove('show');
      (this.usuarioModal.nativeElement as HTMLElement).setAttribute('aria-hidden', 'true');
      (this.usuarioModal.nativeElement as HTMLElement).setAttribute('style', 'display: none');
      document.body.classList.remove('modal-open');
      document.body.removeChild(document.querySelector('.modal-backdrop')!);

      this.usuario = new CUsuario();
      this.usuarioId = 0;
    }
  }
}

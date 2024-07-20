import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterService } from '../Service/master.service';
import { IUsuario } from '../model/usuario';

@Component({
  selector: 'app-estudiantes-page',
  standalone: true,
  imports: [],
  templateUrl: './estudiantes-page.component.html',
  styleUrl: './estudiantes-page.component.css'
})
export class EstudiantesPageComponent implements OnInit {
  usuarios: IUsuario[] = [];

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
}

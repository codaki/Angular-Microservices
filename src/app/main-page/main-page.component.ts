import { Component } from '@angular/core';
import { EstudiantesPageComponent } from '../estudiantes-page/estudiantes-page.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [EstudiantesPageComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}

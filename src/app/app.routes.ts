import { Routes } from '@angular/router';
import { EstudiantesPageComponent } from './estudiantes-page/estudiantes-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CursosPageComponent } from './cursos-page/cursos-page.component';

export const routes: Routes = [
    { path: 'usuarios', component: EstudiantesPageComponent },
    { path: 'cursos', component: CursosPageComponent },
    { path: '', component: MainPageComponent } // Ruta por defecto
];

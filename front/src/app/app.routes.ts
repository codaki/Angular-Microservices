import { Routes } from '@angular/router';
import { EstudiantesPageComponent } from './estudiantes-page/estudiantes-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CursosPageComponent } from './cursos-page/cursos-page.component';
import { RelacionPageComponent } from './relacion-page/relacion-page.component';
//import { AuthGuard } from './guard/keycloak.service';

export const routes: Routes = [
    //{ path: '', component: ContentComponent , canActivate: [AuthGuard]},
    //{ path: '**', redirectTo: '' },
    
    { path: 'usuarios', component: EstudiantesPageComponent },
    { path: 'cursos', component: CursosPageComponent  },
    { path: 'relacion', component: RelacionPageComponent },
    { path: '', component: MainPageComponent  } // Ruta por defecto
];

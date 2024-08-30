// main-page.component.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  constructor(private http: HttpClient, private router: Router) {}

  private authenticate() {
    const url =
      'http://40.70.59.141:8080/realms/estudiantes-cursos/protocol/openid-connect/token';
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'backend');
    body.set('username', 'admin2');
    body.set('password', 'admin2');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<any>(url, body.toString(), { headers: headers });
  }

  navigateToUsuarios() {
    this.authenticate().subscribe(
      (response) => {
        // Almacena el access_token en el localStorage
        localStorage.setItem('access_token', response.access_token);
        console.log('Token almacenado con éxito:', response.access_token);
        // Navega a la página de usuarios
        this.router.navigate(['/usuarios']);
      },
      (error) => {
        console.error('Error en la autenticación:', error);
      }
    );
  }

  navigateToCursos() {
    this.authenticate().subscribe(
      (response) => {
        // Almacena el access_token en el localStorage
        localStorage.setItem('access_token', response.access_token);
        console.log('Token almacenado con éxito:', response.access_token);
        // Navega a la página de cursos
        this.router.navigate(['/cursos']);
      },
      (error) => {
        console.error('Error en la autenticación:', error);
      }
    );
  }

  navigateToRelacion() {
    this.authenticate().subscribe(
      (response) => {
        // Almacena el access_token en el localStorage
        localStorage.setItem('access_token', response.access_token);
        console.log('Token almacenado con éxito:', response.access_token);
        // Navega a la página de relaciones
        this.router.navigate(['/relacion']);
      },
      (error) => {
        console.error('Error en la autenticación:', error);
      }
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CCurso,
  CCursoCompleto,
  CUsuario,
  ICurso,
  ICursoCompleto,
  ICursoUsuario,
  IUsuario,
} from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrlUsuario: string = 'http://40.70.59.141:8001/';
  apiUrlCurso: string = 'http://40.70.59.141:8002/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Obtén el token del localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Añade el token a los headers
    });
  }

  getCursos(): Observable<ICurso[]> {
    return this.http.get<ICurso[]>(this.apiUrlCurso + 'getCursos', {
      headers: this.getHeaders(),
    });
  }

  addCurso(curso: CCurso): Observable<CCurso> {
    return this.http.post<CCurso>(this.apiUrlCurso + 'saveCurso', curso, {
      headers: this.getHeaders(),
    });
  }

  deleteCurso(id: number): Observable<ICurso> {
    return this.http.delete<ICurso>(this.apiUrlCurso + 'eliminarCurso/' + id, {
      headers: this.getHeaders(),
    });
  }

  updateCurso(curso: CCurso, id: number): Observable<CCurso> {
    return this.http.put<CCurso>(
      this.apiUrlCurso + 'modificarCurso/' + id,
      curso,
      { headers: this.getHeaders() }
    );
  }

  asignarUsuario(idCurso: number, usuario: IUsuario): Observable<any> {
    const url = `${this.apiUrlCurso}asignarUsuario/${idCurso}`;
    return this.http.put<any>(url, usuario, { headers: this.getHeaders() });
  }

  desasignarUsuario(idCurso: number, usuario: IUsuario): Observable<any> {
    const url = `${this.apiUrlCurso}eliminarUsuario/${idCurso}`;
    return this.http.put<any>(url, usuario, { headers: this.getHeaders() });
  }

  getCursosCompletos(): Observable<ICursoCompleto[]> {
    return this.http.get<ICursoCompleto[]>(this.apiUrlCurso + 'getCursos', {
      headers: this.getHeaders(),
    });
  }

  getUsuariosNoMatriculados(idCurso: number): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(
      this.apiUrlCurso + 'usuarioIds/' + idCurso,
      { headers: this.getHeaders() }
    );
  }

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiUrlUsuario + 'getUsers', {
      headers: this.getHeaders(),
    });
  }

  addUsuario(usuario: CUsuario): Observable<CUsuario> {
    return this.http.post<CUsuario>(this.apiUrlUsuario + 'saveUser', usuario, {
      headers: this.getHeaders(),
    });
  }

  deleteUsuario(id: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(
      this.apiUrlUsuario + 'eliminarUser/' + id,
      { headers: this.getHeaders() }
    );
  }

  updateUsuario(usuario: CUsuario, id: number): Observable<CUsuario> {
    return this.http.put<CUsuario>(
      this.apiUrlUsuario + 'modificarUser/' + id,
      usuario,
      { headers: this.getHeaders() }
    );
  }
}

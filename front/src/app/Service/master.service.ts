import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICursoUsuario, CCursoCompleto, ICursoCompleto, IUsuario, CUsuario, ICurso, CCurso } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrlUsuario: string = 'http://localhost:8001/';
  apiUrlCurso: string = 'http://localhost:8002/';
  constructor(private http: HttpClient) { }

  getCursos(): Observable<ICurso[]> {
    return this.http.get<ICurso[]>(this.apiUrlCurso + 'getCursos');
  }
  addCurso(curso: CCurso): Observable<CCurso> {
    return this.http.post<CCurso>(this.apiUrlCurso + 'saveCurso', curso);
  }
  deleteCurso(id: number): Observable<ICurso> {
    return this.http.delete<ICurso>(this.apiUrlCurso + 'eliminarCurso/' + id);
  }
  updateCurso(curso: CCurso, id: number): Observable<CCurso> {
    return this.http.put<CCurso>(this.apiUrlCurso + 'modificarCurso/' + id, curso);
  }
  asignarUsuario(idCurso: number, usuario: IUsuario): Observable<any> {
    const url = `${this.apiUrlCurso}asignarUsuario/${idCurso}`;
    return this.http.put<any>(url, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  desasignarUsuario(idCurso: number, usuario: IUsuario): Observable<any> {
    const url = `${this.apiUrlCurso}eliminarUsuario/${idCurso}`;
    return this.http.put<any>(url, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getCursosCompletos(): Observable<ICursoCompleto[]> {
    return this.http.get<ICursoCompleto[]>(this.apiUrlCurso + 'getCursos');
  }
  getUsuariosNoMatriculados(idCurso: number): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiUrlCurso + 'usuarioIds/' + idCurso);
  }
  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiUrlUsuario + 'getUsers');
  }
  addUsuario(usuario: CUsuario): Observable<CUsuario> {
    return this.http.post<CUsuario>(this.apiUrlUsuario + 'saveUser', usuario);
  }
  deleteUsuario(id: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(this.apiUrlUsuario + 'eliminarUser/' + id);
  }
  updateUsuario(usuario: CUsuario, id: number): Observable<CUsuario> {
    return this.http.put<CUsuario>(this.apiUrlUsuario + 'modificarUser/' + id, usuario);
  }
}

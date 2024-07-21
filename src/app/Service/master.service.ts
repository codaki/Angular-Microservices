import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICursoUsuario, IUsuario, CUsuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrlUsuario: string = 'http://localhost:8001/';
  apiUrlCurso: string = 'http://localhost:8002/';
  constructor(private http: HttpClient) { }

  getCursos(): Observable<ICursoUsuario[]> {
    return this.http.get<ICursoUsuario[]>(this.apiUrlCurso + 'getCursos');
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

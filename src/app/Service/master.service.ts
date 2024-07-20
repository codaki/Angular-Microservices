import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICursoUsuario, IUsuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'http://localhost:8001/';
  apiUrl1: string = 'http://localhost:8002/';
  constructor(private http: HttpClient) {}

  getCursos(): Observable<ICursoUsuario[]> {
    return this.http.get<ICursoUsuario[]>(this.apiUrl1 + 'listar');
  }
  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiUrl + 'usuarios');
  }
}

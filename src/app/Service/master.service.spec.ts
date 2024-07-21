import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  CCurso,
  CUsuario,
  ICurso,
  ICursoCompleto,
  ICursoUsuario,
  IUsuario,
} from '../model/usuario';
import { MasterService } from './master.service';

describe('MasterService', () => {
  let service: MasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MasterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cursos', () => {
    const dummyCursos: ICurso[] = [
      { id: 1, nombre: 'Curso 1' },
      { id: 2, nombre: 'Curso 2' },
    ];

    service.getCursos().subscribe((cursos) => {
      expect(cursos.length).toBe(2);
      expect(cursos).toEqual(dummyCursos);
    });

    const req = httpMock.expectOne(service.apiUrlCurso + 'getCursos');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCursos);
  });

  it('should add a curso', () => {
    const newCurso: CCurso = { nombre: 'Nuevo Curso' };

    service.addCurso(newCurso).subscribe((curso) => {
      expect(curso).toEqual(newCurso);
    });

    const req = httpMock.expectOne(service.apiUrlCurso + 'saveCurso');
    expect(req.request.method).toBe('POST');
    req.flush(newCurso);
  });

  it('should delete a curso', () => {
    const cursoId = 1;

    service.deleteCurso(cursoId).subscribe((curso) => {
      expect(curso.id).toBe(cursoId);
    });

    const req = httpMock.expectOne(
      service.apiUrlCurso + 'eliminarCurso/' + cursoId
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({ id: cursoId });
  });

  it('should update a curso', () => {
    const updatedCurso: CCurso = { nombre: 'Curso Actualizado' };
    const cursoId = 1;

    service.updateCurso(updatedCurso, cursoId).subscribe((curso) => {
      expect(curso).toEqual(updatedCurso);
    });

    const req = httpMock.expectOne(
      service.apiUrlCurso + 'modificarCurso/' + cursoId
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCurso);
  });

  it('should assign a usuario to a curso', () => {
    const usuario: IUsuario = {
      id: 1,
      nombre: 'Usuario 1',
      email: 'user1@example.com',
      password: 'password',
    };
    const cursoId = 1;

    service.asignarUsuario(cursoId, usuario).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      service.apiUrlCurso + 'asignarUsuario/' + cursoId
    );
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should unassign a usuario from a curso', () => {
    const usuario: IUsuario = {
      id: 1,
      nombre: 'Usuario 1',
      email: 'user1@example.com',
      password: 'password',
    };
    const cursoId = 1;

    service.desasignarUsuario(cursoId, usuario).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      service.apiUrlCurso + 'eliminarUsuario/' + cursoId
    );
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });
  it('should return cursos completos', () => {
    const dummyCursoUsuario: ICursoUsuario[] = [];
    const dummyCursosCompletos: ICursoCompleto[] = [
      { id: 1, nombre: 'Curso Completo 1', cursoUsuarios: dummyCursoUsuario },
      { id: 2, nombre: 'Curso Completo 2', cursoUsuarios: dummyCursoUsuario },
    ];

    service.getCursosCompletos().subscribe((cursosCompletos) => {
      expect(cursosCompletos.length).toBe(2);
      expect(cursosCompletos).toEqual(dummyCursosCompletos);
    });

    const req = httpMock.expectOne(service.apiUrlCurso + 'getCursos');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCursosCompletos);
  });

  it('should return usuarios no matriculados', () => {
    const dummyUsuarios: IUsuario[] = [
      {
        id: 1,
        nombre: 'Usuario 1',
        email: 'user1@example.com',
        password: 'password',
      },
      {
        id: 2,
        nombre: 'Usuario 2',
        email: 'user2@example.com',
        password: 'password',
      },
    ];

    service.getUsuariosNoMatriculados().subscribe((usuarios) => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(dummyUsuarios);
    });

    const req = httpMock.expectOne(service.apiUrlCurso + 'usuarioIds');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

  it('should return usuarios', () => {
    const dummyUsuarios: IUsuario[] = [
      {
        id: 1,
        nombre: 'Usuario 1',
        email: 'user1@example.com',
        password: 'password',
      },
      {
        id: 2,
        nombre: 'Usuario 2',
        email: 'user2@example.com',
        password: 'password',
      },
    ];

    service.getUsuarios().subscribe((usuarios) => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(dummyUsuarios);
    });

    const req = httpMock.expectOne(service.apiUrlUsuario + 'getUsers');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

  it('should add a usuario', () => {
    const newUsuario: CUsuario = {
      nombre: 'Nuevo Usuario',
      email: 'newuser@example.com',
      password: 'password',
    };

    service.addUsuario(newUsuario).subscribe((usuario) => {
      expect(usuario).toEqual(newUsuario);
    });

    const req = httpMock.expectOne(service.apiUrlUsuario + 'saveUser');
    expect(req.request.method).toBe('POST');
    req.flush(newUsuario);
  });

  it('should delete a usuario', () => {
    const usuarioId = 1;

    service.deleteUsuario(usuarioId).subscribe((usuario) => {
      expect(usuario.id).toBe(usuarioId);
    });

    const req = httpMock.expectOne(
      service.apiUrlUsuario + 'eliminarUser/' + usuarioId
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({ id: usuarioId });
  });

  it('should update a usuario', () => {
    const updatedUsuario: CUsuario = {
      nombre: 'Usuario Actualizado',
      email: 'updateduser@example.com',
      password: 'newpassword',
    };
    const usuarioId = 1;

    service.updateUsuario(updatedUsuario, usuarioId).subscribe((usuario) => {
      expect(usuario).toEqual(updatedUsuario);
    });

    const req = httpMock.expectOne(
      service.apiUrlUsuario + 'modificarUser/' + usuarioId
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUsuario);
  });
});

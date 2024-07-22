/// <reference types="jasmine" />
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ICurso, ICursoCompleto, IUsuario } from '../model/usuario';
import { MasterService } from '../Service/master.service';
import { RelacionPageComponent } from './relacion-page.component';

describe('RelacionPageComponent', () => {
  let component: RelacionPageComponent;
  let fixture: ComponentFixture<RelacionPageComponent>;
  let masterServiceSpy: jasmine.SpyObj<MasterService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MasterService', [
      'getCursos',
      'getUsuarios',
      'getUsuariosNoMatriculados',
      'getCursosCompletos',
      'addCurso',
      'deleteCurso',
      'updateCurso',
      'asignarUsuario',
      'desasignarUsuario',
    ]);

    await TestBed.configureTestingModule({
      imports: [RelacionPageComponent, HttpClientTestingModule],
      providers: [{ provide: MasterService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RelacionPageComponent);
    component = fixture.componentInstance;
    masterServiceSpy = TestBed.inject(
      MasterService
    ) as jasmine.SpyObj<MasterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load cursos on init', fakeAsync(() => {
  //   const mockCursos: ICurso[] = [{ id: 1, nombre: 'Curso 1' }];
  //   masterServiceSpy.getCursos.and.returnValue(of(mockCursos));

  //   component.ngOnInit();
  //   tick();

  //   expect(component.cursos).toEqual(mockCursos);
  //   expect(masterServiceSpy.getCursos).toHaveBeenCalled();
  // }));

  // it('should load usuarios on init', fakeAsync(() => {
  //   const mockUsuarios: IUsuario[] = [
  //     {
  //       id: 1,
  //       nombre: 'Usuario 1',
  //       email: 'user1@example.com',
  //       password: 'password',
  //     },
  //   ];
  //   masterServiceSpy.getUsuarios.and.returnValue(of(mockUsuarios));

  //   component.ngOnInit();
  //   tick();

  //   expect(component.usuarios).toEqual(mockUsuarios);
  //   expect(masterServiceSpy.getUsuarios).toHaveBeenCalled();
  // }));

  // it('should load cursos completos on init', fakeAsync(() => {
  //   const mockCursosCompletos: ICursoCompleto[] = [
  //     { id: 1, nombre: 'Curso 1', cursoUsuarios: [] },
  //   ];
  //   masterServiceSpy.getCursosCompletos.and.returnValue(
  //     of(mockCursosCompletos)
  //   );

  //   component.ngOnInit();
  //   tick();

  //   expect(component.cursosCompletos).toEqual(mockCursosCompletos);
  //   expect(masterServiceSpy.getCursosCompletos).toHaveBeenCalled();
  // }));

  it('should get usuario nombre correctly', () => {
    component.usuarios = [
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

    expect(component.getUsuarioNombre(1)).toBe('Usuario 1');
    expect(component.getUsuarioNombre(3)).toBe('Desconocido');
  });

  // it('should add curso successfully', fakeAsync(() => {
  //   const mockCurso = { id: 1, nombre: 'Nuevo Curso' };
  //   masterServiceSpy.addCurso.and.returnValue(of(mockCurso));
  //   spyOn(component, 'loadCursos');
  //   spyOn(component, 'closeModal');

  //   component.matricularEstudiante();
  //   tick();

  //   expect(masterServiceSpy.addCurso).toHaveBeenCalledWith(component.curso);
  //   expect(component.loadCursos).toHaveBeenCalled();
  //   expect(component.closeModal).toHaveBeenCalled();
  // }));

  // it('should handle error when adding curso', fakeAsync(() => {
  //   masterServiceSpy.addCurso.and.returnValue(
  //     throwError(() => new Error('Error'))
  //   );
  //   spyOn(console, 'error');
  //   spyOn(window, 'alert');

  //   component.addCurso();
  //   tick();

  //   expect(console.error).toHaveBeenCalled();
  //   expect(window.alert).toHaveBeenCalledWith(
  //     'Ocurrió un error al añadir el curso. Por favor, verifique que el nombre del curso no exista e inténtelo de nuevo.'
  //   );
  // }));

  // it('should delete curso successfully', fakeAsync(() => {
  //   const cursoId = 1;
  //   masterServiceSpy.deleteCurso.and.returnValue(of(null));
  //   spyOn(component, 'loadCursos');

  //   component.deleteCurso(cursoId);
  //   tick();

  //   expect(masterServiceSpy.deleteCurso).toHaveBeenCalledWith(cursoId);
  //   expect(component.loadCursos).toHaveBeenCalled();
  // }));

  // it('should update curso successfully', fakeAsync(() => {
  //   const mockCurso = { id: 1, nombre: 'Updated Curso' };
  //   masterServiceSpy.updateCurso.and.returnValue(of(mockCurso));
  //   spyOn(component, 'loadCursos');
  //   spyOn(component, 'closeModal');

  //   component.cursoId = 1;
  //   component.updateCurso();
  //   tick();

  //   expect(masterServiceSpy.updateCurso).toHaveBeenCalledWith(
  //     component.curso,
  //     component.cursoId
  //   );
  //   expect(component.loadCursos).toHaveBeenCalled();
  //   expect(component.closeModal).toHaveBeenCalled();
  // }));

  // it('should handle error when updating curso', fakeAsync(() => {
  //   masterServiceSpy.updateCurso.and.returnValue(
  //     throwError(() => new Error('Error'))
  //   );
  //   spyOn(console, 'error');
  //   spyOn(window, 'alert');

  //   component.updateCurso();
  //   tick();

  //   expect(console.error).toHaveBeenCalled();
  //   expect(window.alert).toHaveBeenCalledWith(
  //     'Ocurrió un error al modificar el curso. Por favor, verifique que el nombre del curso no exista e inténtelo de nuevo.'
  //   );
  // }));

  it('should matricular estudiante successfully', fakeAsync(() => {
    const mockUsuario = {
      id: 1,
      nombre: 'Usuario 1',
      email: 'user1@example.com',
      password: 'password',
    };
    component.usuarios = [mockUsuario];
    masterServiceSpy.asignarUsuario.and.returnValue(of({}));
    spyOn(component, 'loadCursos');
    spyOn(component, 'loadEstudiantes');
    spyOn(component, 'loadUsuarios');
    spyOn(component, 'loadCursosCompletos');
    spyOn(component, 'closeModal');

    component.matricularEstudiante(1);
    tick();

    expect(masterServiceSpy.asignarUsuario).toHaveBeenCalledWith(
      component.cursoId,
      mockUsuario
    );
    expect(component.loadCursos).toHaveBeenCalled();
    expect(component.loadEstudiantes).toHaveBeenCalled();
    expect(component.loadUsuarios).toHaveBeenCalled();
    expect(component.loadCursosCompletos).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  }));

  it('should handle error when matricular estudiante', fakeAsync(() => {
    const mockUsuario = {
      id: 1,
      nombre: 'Usuario 1',
      email: 'user1@example.com',
      password: 'password',
    };
    component.usuarios = [mockUsuario];
    masterServiceSpy.asignarUsuario.and.returnValue(
      throwError(() => new Error('Error'))
    );
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.matricularEstudiante(1);
    tick();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Ocurrió un error al matricular el estudiante. Por favor, inténtelo de nuevo.'
    );
  }));

  it('should desmatricular estudiante successfully', fakeAsync(() => {
    const mockUsuario = {
      id: 1,
      nombre: 'Usuario 1',
      email: 'user1@example.com',
      password: 'password',
    };
    component.usuarios = [mockUsuario];
    masterServiceSpy.desasignarUsuario.and.returnValue(of({}));
    spyOn(component, 'loadCursos');
    spyOn(component, 'loadEstudiantes');
    spyOn(component, 'loadUsuarios');
    spyOn(component, 'loadCursosCompletos');

    component.desmatricularEstudiante(1, 1);
    tick();

    expect(masterServiceSpy.desasignarUsuario).toHaveBeenCalledWith(
      1,
      mockUsuario
    );
    expect(component.loadCursos).toHaveBeenCalled();
    expect(component.loadEstudiantes).toHaveBeenCalled();
    expect(component.loadUsuarios).toHaveBeenCalled();
    expect(component.loadCursosCompletos).toHaveBeenCalled();
  }));

  it('should handle error when desmatricular estudiante', fakeAsync(() => {
    const mockUsuario = {
      id: 1,
      nombre: 'Usuario 1',
      email: 'user1@example.com',
      password: 'password',
    };
    component.usuarios = [mockUsuario];
    masterServiceSpy.desasignarUsuario.and.returnValue(
      throwError(() => new Error('Error'))
    );
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.desmatricularEstudiante(1, 1);
    tick();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Ocurrió un error al desmatricular el estudiante. Por favor, inténtelo de nuevo.'
    );
  }));
});

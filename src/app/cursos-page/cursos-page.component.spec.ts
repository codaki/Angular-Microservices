/// <reference types="jasmine" />
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CCurso, ICurso } from '../model/usuario';
import { MasterService } from '../Service/master.service';
import { CursosPageComponent } from './cursos-page.component';

describe('CursosPageComponent', () => {
  let component: CursosPageComponent;
  let fixture: ComponentFixture<CursosPageComponent>;
  let masterServiceSpy: jasmine.SpyObj<MasterService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MasterService', [
      'getCursos',
      'addCurso',
      'deleteCurso',
      'updateCurso',
    ]);

    await TestBed.configureTestingModule({
      imports: [CursosPageComponent, HttpClientTestingModule],
      providers: [{ provide: MasterService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CursosPageComponent);
    component = fixture.componentInstance;
    masterServiceSpy = TestBed.inject(
      MasterService
    ) as jasmine.SpyObj<MasterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cursos on init', fakeAsync(() => {
    const mockCursos: ICurso[] = [
      { id: 1, nombre: 'Curso 1' },
      { id: 2, nombre: 'Curso 2' },
    ];
    masterServiceSpy.getCursos.and.returnValue(of(mockCursos));

    component.ngOnInit();
    tick();

    expect(component.cursos).toEqual(mockCursos);
    expect(masterServiceSpy.getCursos).toHaveBeenCalled();
  }));

  it('should add curso successfully', fakeAsync(() => {
    const mockCurso = new CCurso();
    mockCurso.nombre = 'Nuevo Curso';

    masterServiceSpy.addCurso.and.returnValue(of(mockCurso));
    spyOn(component, 'loadCursos');
    spyOn(component, 'closeModal');

    component.curso = mockCurso;
    component.addCurso();
    tick();

    expect(masterServiceSpy.addCurso).toHaveBeenCalledWith(mockCurso);
    expect(component.loadCursos).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  }));

  it('should handle error when adding curso', fakeAsync(() => {
    masterServiceSpy.addCurso.and.returnValue(
      throwError(() => new Error('Error'))
    );
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.addCurso();
    tick();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Ocurrió un error al añadir el curso. Por favor, verifique que el nombre del curso no exista e inténtelo de nuevo.'
    );
  }));

  it('should handle error when deleting curso', fakeAsync(() => {
    const cursoId = 1;
    masterServiceSpy.deleteCurso.and.returnValue(
      throwError(() => new Error('Error'))
    );
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.deleteCurso(cursoId);
    tick();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error al eliminar curso.');
  }));

  it('should update curso successfully', fakeAsync(() => {
    const mockCurso = new CCurso();
    mockCurso.nombre = 'Curso Actualizado';

    masterServiceSpy.updateCurso.and.returnValue(of(mockCurso));
    spyOn(component, 'loadCursos');
    spyOn(component, 'closeModal');

    component.curso = mockCurso;
    component.cursoId = 1;
    component.updateCurso();
    tick();

    expect(masterServiceSpy.updateCurso).toHaveBeenCalledWith(mockCurso, 1);
    expect(component.loadCursos).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  }));

  it('should handle error when updating curso', fakeAsync(() => {
    masterServiceSpy.updateCurso.and.returnValue(
      throwError(() => new Error('Error'))
    );
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.updateCurso();
    tick();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Ocurrió un error al modificar el curso. Por favor, verifique que el nombre del curso no exista e inténtelo de nuevo.'
    );
  }));

  it('should set curso and cursoId when onUpdateCurso is called', () => {
    const mockCurso = new CCurso();
    mockCurso.nombre = 'Curso Test';
    const mockId = 1;

    component.onUpdateCurso(mockCurso, mockId);

    expect(component.curso).toEqual(mockCurso);
    expect(component.cursoId).toBe(mockId);
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CUsuario, IUsuario } from '../model/usuario';
import { MasterService } from '../Service/master.service';
import { EstudiantesPageComponent } from './estudiantes-page.component';

describe('EstudiantesPageComponent', () => {
  let component: EstudiantesPageComponent;
  let fixture: ComponentFixture<EstudiantesPageComponent>;
  let masterServiceSpy: jasmine.SpyObj<MasterService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MasterService', [
      'getUsuarios',
      'addUsuario',
      'deleteUsuario',
      'updateUsuario',
    ]);

    await TestBed.configureTestingModule({
      imports: [EstudiantesPageComponent, HttpClientTestingModule],
      providers: [{ provide: MasterService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(EstudiantesPageComponent);
    component = fixture.componentInstance;
    masterServiceSpy = TestBed.inject(
      MasterService
    ) as jasmine.SpyObj<MasterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load usuarios on init', fakeAsync(() => {
    const mockUsuarios: IUsuario[] = [
      {
        id: 1,
        nombre: 'Usuario 1',
        email: 'user1@example.com',
        password: 'password1',
      },
      {
        id: 2,
        nombre: 'Usuario 2',
        email: 'user2@example.com',
        password: 'password2',
      },
    ];
    masterServiceSpy.getUsuarios.and.returnValue(of(mockUsuarios));

    component.ngOnInit();
    tick();

    expect(component.usuarios).toEqual(mockUsuarios);
    expect(masterServiceSpy.getUsuarios).toHaveBeenCalled();
  }));

  it('should add usuario successfully', fakeAsync(() => {
    const mockUsuario = new CUsuario();
    mockUsuario.nombre = 'Nuevo Usuario';
    mockUsuario.email = 'nuevo@example.com';
    mockUsuario.password = 'password';

    masterServiceSpy.addUsuario.and.returnValue(of(mockUsuario));
    spyOn(component, 'loadUsuarios');
    spyOn(component, 'closeModal');

    component.usuario = mockUsuario;
    component.addUsuario();
    tick();

    expect(masterServiceSpy.addUsuario).toHaveBeenCalledWith(mockUsuario);
    expect(component.loadUsuarios).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  }));

  it('should handle error when adding usuario', fakeAsync(() => {
    masterServiceSpy.addUsuario.and.returnValue(
      throwError(() => new Error('Error'))
    );
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.addUsuario();
    tick();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Ocurrió un error al añadir el usuario. Por favor, inténtelo de nuevo.'
    );
  }));

  // it('should delete usuario successfully', fakeAsync(() => {
  //   const usuarioId = 1;
  //   masterServiceSpy.deleteUsuario.and.returnValue(of(null));
  //   spyOn(component, 'loadUsuarios');

  //   component.deleteUsuario(usuarioId);
  //   tick();

  //   expect(masterServiceSpy.deleteUsuario).toHaveBeenCalledWith(usuarioId);
  //   expect(component.loadUsuarios).toHaveBeenCalled();
  // }));

  it('should handle error when deleting usuario', fakeAsync(() => {
    const usuarioId = 1;
    masterServiceSpy.deleteUsuario.and.returnValue(
      throwError(() => new Error('Error'))
    );
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.deleteUsuario(usuarioId);
    tick();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error al eliminar usuario.');
  }));

  it('should update usuario successfully', fakeAsync(() => {
    const mockUsuario = new CUsuario();
    mockUsuario.nombre = 'Usuario Actualizado';
    mockUsuario.email = 'actualizado@example.com';
    mockUsuario.password = 'newpassword';

    masterServiceSpy.updateUsuario.and.returnValue(of(mockUsuario));
    spyOn(component, 'loadUsuarios');
    spyOn(component, 'closeModal');

    component.usuario = mockUsuario;
    component.usuarioId = 1;
    component.updateUsuario();
    tick();

    expect(masterServiceSpy.updateUsuario).toHaveBeenCalledWith(mockUsuario, 1);
    expect(component.loadUsuarios).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  }));

  it('should handle error when updating usuario', fakeAsync(() => {
    masterServiceSpy.updateUsuario.and.returnValue(
      throwError(() => new Error('Error'))
    );
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.updateUsuario();
    tick();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Ocurrió un error al modificar el usuario. Por favor, inténtelo de nuevo.'
    );
  }));

  it('should set usuario and usuarioId when onUpdateUsuario is called', () => {
    const mockUsuario = new CUsuario();
    mockUsuario.nombre = 'Usuario Test';
    mockUsuario.email = 'test@example.com';
    mockUsuario.password = 'testpassword';
    const mockId = 1;

    component.onUpdateUsuario(mockUsuario, mockId);

    expect(component.usuario).toEqual(mockUsuario);
    expect(component.usuarioId).toBe(mockId);
  });

  // it('should close modal and reset usuario and usuarioId', () => {
  //   const mockElement = document.createElement('div');
  //   mockElement.classList.add('show');
  //   mockElement.setAttribute('aria-hidden', 'false');
  //   mockElement.setAttribute('style', 'display: block');
  //   component.usuarioModal = { nativeElement: mockElement } as ElementRef;

  //   document.body.classList.add('modal-open');
  //   const backdrop = document.createElement('div');
  //   backdrop.classList.add('modal-backdrop');
  //   document.body.appendChild(backdrop);

  //   component.usuario = new CUsuario();
  //   component.usuario.nombre = 'Test';
  //   component.usuarioId = 1;

  //   component.closeModal();

  //   expect(mockElement.classList.contains('show')).toBeFalse();
  //   expect(mockElement.getAttribute('aria-hidden')).toBe('true');
  //   expect(mockElement.getAttribute('style')).toBe('display: none');
  //   expect(document.body.classList.contains('modal-open')).toBeFalse();
  //   expect(document.querySelector('.modal-backdrop')).toBeNull();
  //   expect(component.usuario).toEqual(new CUsuario());
  //   expect(component.usuarioId).toBe(0);
  // });
});

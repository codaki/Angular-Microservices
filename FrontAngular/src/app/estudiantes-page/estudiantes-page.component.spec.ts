import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesPageComponent } from './estudiantes-page.component';

describe('EstudiantesPageComponent', () => {
  let component: EstudiantesPageComponent;
  let fixture: ComponentFixture<EstudiantesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudiantesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

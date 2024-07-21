import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionPageComponent } from './relacion-page.component';

describe('RelacionPageComponent', () => {
  let component: RelacionPageComponent;
  let fixture: ComponentFixture<RelacionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelacionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

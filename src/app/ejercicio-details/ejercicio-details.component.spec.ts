import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioDetailsComponent } from './ejercicio-details.component';

describe('EjercicioDetailsComponent', () => {
  let component: EjercicioDetailsComponent;
  let fixture: ComponentFixture<EjercicioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjercicioDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjercicioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioContainerComponent } from './ejercicio-container.component';

describe('EjercicioContainerComponent', () => {
  let component: EjercicioContainerComponent;
  let fixture: ComponentFixture<EjercicioContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjercicioContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjercicioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

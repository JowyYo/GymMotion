import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenamientoDetailsComponent } from './entrenamiento-details.component';

describe('EntrenamientoDetailsComponent', () => {
  let component: EntrenamientoDetailsComponent;
  let fixture: ComponentFixture<EntrenamientoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrenamientoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrenamientoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

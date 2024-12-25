import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieContainerComponent } from './serie-container.component';

describe('SerieContainerComponent', () => {
  let component: SerieContainerComponent;
  let fixture: ComponentFixture<SerieContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerieContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

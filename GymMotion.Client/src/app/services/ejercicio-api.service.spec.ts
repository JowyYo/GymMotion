import { TestBed } from '@angular/core/testing';

import { EjercicioApiService } from './ejercicio-api.service';

describe('EjercicioApiService', () => {
  let service: EjercicioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

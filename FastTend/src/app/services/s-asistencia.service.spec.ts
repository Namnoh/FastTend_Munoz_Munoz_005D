import { TestBed } from '@angular/core/testing';

import { SAsistenciaService } from './s-asistencia.service';

describe('SAsistenciaService', () => {
  let service: SAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

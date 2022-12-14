import { TestBed } from '@angular/core/testing';

import { TAsistenciaService } from './t-asistencia.service';

describe('TAsistenciaService', () => {
  let service: TAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

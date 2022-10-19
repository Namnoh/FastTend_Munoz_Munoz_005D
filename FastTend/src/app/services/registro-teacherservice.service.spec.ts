import { TestBed } from '@angular/core/testing';

import { RegistroTeacherserviceService } from './registro-teacherservice.service';

describe('RegistroTeacherserviceService', () => {
  let service: RegistroTeacherserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroTeacherserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

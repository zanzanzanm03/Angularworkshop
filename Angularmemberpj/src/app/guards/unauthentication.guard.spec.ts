import { TestBed, async, inject } from '@angular/core/testing';

import { UnauthenticationGuard } from './unauthentication.guard';

describe('UnauthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthenticationGuard]
    });
  });

  it('should ...', inject([UnauthenticationGuard], (guard: UnauthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});

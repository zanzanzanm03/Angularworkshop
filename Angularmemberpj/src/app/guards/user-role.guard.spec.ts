import { TestBed, async, inject } from '@angular/core/testing';

import { UserRoleGuard } from './user-role.guard';

describe('UserRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRoleGuard]
    });
  });

  it('should ...', inject([UserRoleGuard], (guard: UserRoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});

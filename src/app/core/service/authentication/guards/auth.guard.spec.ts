import {TestBed} from '@angular/core/testing';
import {AuthGuard} from './auth.guard';
import {AuthenticationService} from "../authentication.service";

describe('AuthGuard', () => {
  let guard: AuthGuard;

  const mockAuthenticationService = {
    initAuthListener: jasmine.createSpy('initAuthListener'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthenticationService, useValue: mockAuthenticationService},
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import {TestBed} from '@angular/core/testing';
import {LoginPage} from './login.page';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {params: of({id: 'test-id'})}
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

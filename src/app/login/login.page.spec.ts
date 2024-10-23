import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginPage} from './login.page';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {params: of({id: 'test-id'})} // Vous pouvez fournir des valeurs simulées ici
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

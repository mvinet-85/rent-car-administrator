import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RegisterPage} from './register.page';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {params: of({id: 'test-id'})}
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

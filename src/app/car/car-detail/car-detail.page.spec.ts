import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CarDetailPage} from './car-detail.page';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('CarDetailPage', () => {
  let component: CarDetailPage;
  let fixture: ComponentFixture<CarDetailPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarDetailPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'some-id',
              },
            },
            queryParams: of({someParam: 'someValue'}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

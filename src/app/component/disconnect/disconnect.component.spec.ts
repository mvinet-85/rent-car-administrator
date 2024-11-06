import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DisconnectComponent} from './disconnect.component';

describe('DisconnectComponent', () => {
  let component: DisconnectComponent;
  let fixture: ComponentFixture<DisconnectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), DisconnectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DisconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

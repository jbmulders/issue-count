import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ToastComponent } from './toast.component';

const mockData = { message: 'test' };

describe('ToastComponent [u]', () => {
  let component: ToastComponent;

  beforeEach(() => {
    component = new ToastComponent();
  });

  it('should set `show` to false on init', fakeAsync(() => {
    // arrange
    component.error$ = of(null);

    // act
    component.ngOnInit();
    tick(100);

    // assert
    expect(component.show).toBeFalse();

    tick(4000);
  }));

  it('should set `show` to true when new message is emitted', fakeAsync(() => {
    // arrange
    component.error$ = of(mockData);

    // act
    component.ngOnInit();
    tick(100);

    // assert
    expect(component.show).toBeTrue();

    // this makes sure we dont get a 'timer in progress error'
    tick(4000);
  }));

  it('should set `show` to false 4 seconds after new message is emitted', fakeAsync(() => {
    // arrange
    component.error$ = of(mockData);

    // act
    component.ngOnInit();
    tick(5000);

    // assert
    expect(component.show).toBeFalse();
  }));
});

describe('ToastComponent [i]', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    component.error$ = of(mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the message div when `show` is set to false', () => {
    // arrange, act
    component.show = false;
    fixture.detectChanges();

    const messageContainer = fixture.debugElement.query(By.css('div'));

    // assert
    expect(messageContainer).toBeFalsy();
  });

  it('should show the message div when `show` is set to true', () => {
    // arrange, act
    component.show = true;
    fixture.detectChanges();

    const messageContainer = fixture.debugElement.query(By.css('div'));

    expect(messageContainer.nativeElement.textContent.trim()).toEqual(
      mockData.message
    );
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapElementsComponent } from './bootstrap-elements.component';

describe('BootstrapElementsComponent', () => {
  let component: BootstrapElementsComponent;
  let fixture: ComponentFixture<BootstrapElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityClassComponent } from './community-class.component';

describe('CommunityClassComponent', () => {
  let component: CommunityClassComponent;
  let fixture: ComponentFixture<CommunityClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

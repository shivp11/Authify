import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpostsubComponent } from './addpostsub.component';

describe('AddpostsubComponent', () => {
  let component: AddpostsubComponent;
  let fixture: ComponentFixture<AddpostsubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpostsubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpostsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

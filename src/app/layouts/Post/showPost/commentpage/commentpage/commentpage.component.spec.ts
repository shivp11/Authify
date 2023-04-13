import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentpageComponent } from './commentpage.component';

describe('CommentpageComponent', () => {
  let component: CommentpageComponent;
  let fixture: ComponentFixture<CommentpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

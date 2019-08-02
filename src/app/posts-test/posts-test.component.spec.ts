import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsTestComponent } from './posts-test.component';

describe('PostsTestComponent', () => {
  let component: PostsTestComponent;
  let fixture: ComponentFixture<PostsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavoriteSongsComponent } from './my-favorite-songs.component';

describe('MyFavoriteSongsComponent', () => {
  let component: MyFavoriteSongsComponent;
  let fixture: ComponentFixture<MyFavoriteSongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFavoriteSongsComponent]
    });
    fixture = TestBed.createComponent(MyFavoriteSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

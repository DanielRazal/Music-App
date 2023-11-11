import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyTrackComponent } from './spotify-track.component';

describe('SpotifyTrackComponent', () => {
  let component: SpotifyTrackComponent;
  let fixture: ComponentFixture<SpotifyTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotifyTrackComponent]
    });
    fixture = TestBed.createComponent(SpotifyTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

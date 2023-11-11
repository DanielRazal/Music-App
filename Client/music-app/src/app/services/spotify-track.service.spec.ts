import { TestBed } from '@angular/core/testing';

import { SpotifyTrackService } from './spotify-track.service';

describe('SpotifyTrackService', () => {
  let service: SpotifyTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

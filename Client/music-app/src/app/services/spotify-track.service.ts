import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyTrack } from '../models/SpotifyTrack';

@Injectable({
  providedIn: 'root'
})
export class SpotifyTrackService {

  constructor(private http: HttpClient) { }

  searchSongs(keyword: string): Observable<SpotifyTrack[]> {
    const url = `http://localhost:3001/Music/search/${keyword}`;
    return this.http.get<SpotifyTrack[]>(url);
  }

  selectTrack(track: SpotifyTrack, selectedTrack: SpotifyTrack | null = null): void{
    selectedTrack = track;
    localStorage.setItem('selectedTrack', JSON.stringify(track));
  }

}

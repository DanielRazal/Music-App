import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyTrack } from '../models/SpotifyTrack';

@Injectable({
  providedIn: 'root'
})
export class SpotifyTrackService {

  constructor(private http: HttpClient) { }

  private headers() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return httpOptions;
  }

  searchSongs(keyword: string): Observable<SpotifyTrack[]> {
    const url = `http://localhost:3001/Music/search/${keyword}`;
    return this.http.get<SpotifyTrack[]>(url);
  }

  addFavoriteSong(userId: string, track: SpotifyTrack): Observable<SpotifyTrack> {
    const url = `http://localhost:3001/Music/${userId}`;
    return this.http.post<SpotifyTrack>(url, track, { headers: { 'Content-Type': 'application/json' } });
}

}

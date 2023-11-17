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
    return this.http.post<SpotifyTrack>(url, track, this.headers());
  }

  isFavoriteSong(userId: string, songId: string, isFavorite: boolean): Observable<SpotifyTrack> {
    const url = `http://localhost:3001/Music/${userId}/${songId}`;
    const requestBody = { isFavorite: isFavorite };
    return this.http.patch<SpotifyTrack>(url, requestBody, this.headers());
  }

  getSongsByUser(userId: string): Observable<SpotifyTrack[]> {
    const url = `http://localhost:3001/Music/${userId}`;
    return this.http.get<SpotifyTrack[]>(url);
  }

  deleteFavoriteSong(id: string): Observable<SpotifyTrack> {
    const url = `http://localhost:3001/Music/${id}`;
    return this.http.delete<SpotifyTrack>(url);
  }

}

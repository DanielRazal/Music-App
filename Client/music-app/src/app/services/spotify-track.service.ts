import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyTrack } from '../models/SpotifyTrack';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyTrackService {

  private baseUrl = environment.baseUrl;
  private musicApi = environment.music;
  private search = environment.search;
  private userApi = environment.user;
  constructor(private http: HttpClient) { }

  private headers() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return httpOptions;
  }


  searchSongs(keyword: string): Observable<SpotifyTrack[]> {
    return this.http.get<SpotifyTrack[]>(this.baseUrl + this.musicApi + this.search + "/" + keyword);
  }

  addFavoriteSong(userId: string, track: SpotifyTrack): Observable<SpotifyTrack> {
    return this.http.post<SpotifyTrack>(this.baseUrl + this.musicApi + "/" + userId, track, this.headers());
  }

  isFavoriteSong(userId: string, songId: string, isFavorite: boolean): Observable<SpotifyTrack> {
    const requestBody = { isFavorite: isFavorite };
    return this.http.patch<SpotifyTrack>
      (this.baseUrl + this.musicApi + "/" + userId + "/" + songId, requestBody, this.headers());
  }

  getSongsByUser(userId: string): Observable<SpotifyTrack[]> {
    return this.http.get<SpotifyTrack[]>(this.baseUrl + this.musicApi + "/" + userId);
  }

  deleteFavoriteSong(id: string): Observable<SpotifyTrack> {
    return this.http.delete<SpotifyTrack>(this.baseUrl + this.musicApi + "/" + id);
  }

  deleteSongsByUser(userId: string): Observable<SpotifyTrack[]> {
    return this.http.delete<SpotifyTrack[]>(this.baseUrl + this.musicApi + this.userApi + "/" + userId);
  }
}

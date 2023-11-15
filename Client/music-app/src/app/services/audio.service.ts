import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpotifyTrack } from '../models/SpotifyTrack';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private currentAudio: HTMLAudioElement | null = null;
  private pausedTime: number = 0;
  currentTimeDisplay: string = '00:00';

  constructor() { }

  playAudio(track: SpotifyTrack): HTMLAudioElement | null {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.pausedTime = this.currentAudio.currentTime;
    }

    this.currentAudio = new Audio(track.preview_url);
    this.currentAudio.currentTime = this.pausedTime;
    this.currentAudio.play();

    return this.currentAudio;
  }

  resetAudio(): HTMLAudioElement | null {
    this.currentAudio!.pause();
    this.currentAudio!.currentTime = 0;
    return this.currentAudio
  }

  updateTimeDisplays() : HTMLAudioElement | null {
    const minutes = Math.floor(this.currentAudio!.currentTime / 60);
    const seconds = Math.floor(this.currentAudio!.currentTime % 60);
    this.currentTimeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return this.currentAudio
  }
}
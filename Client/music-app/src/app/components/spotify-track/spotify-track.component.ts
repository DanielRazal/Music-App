import { Component, OnInit } from '@angular/core';
import { SpotifyTrack } from 'src/app/models/SpotifyTrack';
import { AudioService } from 'src/app/services/audio.service';
import { SpotifyTrackService } from 'src/app/services/spotify-track.service';

@Component({
  selector: 'app-spotify-track',
  templateUrl: './spotify-track.component.html',
  styleUrls: ['./spotify-track.component.css']
})

export class SpotifyTrackComponent implements OnInit {

  spotifyTrack: SpotifyTrack[] = [];
  keyword: string = "";
  currentAudio: HTMLAudioElement | null = null;
  showContent: boolean = false;
  selectedTrack: SpotifyTrack | null = null;
  isPlaying: boolean = false
  isInputFocused: boolean = false;

  constructor(private spotifyService: SpotifyTrackService, private audioService: AudioService) { }

  ngOnInit(): void {
    this.searchSongs(this.keyword);

    const storedTrack = localStorage.getItem('selectedTrack');
    if (storedTrack) {
      this.selectedTrack = JSON.parse(storedTrack);
    }
  }

  searchSongs(keyword: string) {
    this.spotifyService.searchSongs(keyword).subscribe((spotifyTrack) => {
      this.spotifyTrack = spotifyTrack;
    })
  }


  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  closeModal(): void {
    this.showContent = false;
    localStorage.clear();
    this.isPlaying = false;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
  }


  selectTrack(track: SpotifyTrack): void {
    this.selectedTrack = track;
    localStorage.setItem('selectedTrack', JSON.stringify(track));
    this.showContent = true;
  }

  private pausedTime: number = 28;

  currentTimeDisplay: string = '00:00';
  endTimeDisplay: string = '00:29';


  playAudio(track: SpotifyTrack): void {

    this.currentAudio = this.audioService.playAudio(track);

    this.currentAudio!.addEventListener('timeupdate', () => {
      this.updateTimeDisplays();
    });

    this.currentAudio!.addEventListener('ended', () => {
      this.isPlaying = false;
      this.updateTimeDisplays();
    });
  }

  updateTimeDisplays(): void {
    if (this.currentAudio) {
      const minutes = Math.floor(this.currentAudio.currentTime / 60);
      const seconds = Math.floor(this.currentAudio.currentTime % 60);
      this.currentTimeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      const maxDuration = 29;
      if (this.currentAudio.currentTime >= maxDuration) {
        this.resetAudio();
      }
    }
  }

  resetAudio(): void {
    if (this.currentAudio) {
      this.currentAudio = this.audioService.resetAudio();
      this.isPlaying = false;
    }
  }

  toggleAudio(): void {
    if (this.isPlaying) {
      this.currentAudio = this.audioService.resetAudio();
    } else if (this.selectedTrack) {
      this.playAudio(this.selectedTrack);
    }

    this.isPlaying = !this.isPlaying;
  }

  volumeValue: number = 0.5;


  onVolumeChange(): void {
    if (this.currentAudio) {
      this.currentAudio.volume = this.volumeValue;
    }
  }

  secondsValue: number = 0;

  onSecondsChange(): void {
    if (this.currentAudio) {
      this.currentAudio.currentTime = this.secondsValue;
      this.updateTimeDisplays();
    }
  }

}
import { Component, OnInit } from '@angular/core';
import { SpotifyTrack } from 'src/app/models/SpotifyTrack';
import { AudioService } from 'src/app/services/audio.service';
import { SpotifyTrackService } from 'src/app/services/spotify-track.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spotify-track',
  templateUrl: './spotify-track.component.html',
  styleUrls: ['./spotify-track.component.css']
})

export class SpotifyTrackComponent implements OnInit {

  spotifyTracks: SpotifyTrack[] = [];
  spotifyTracks2: SpotifyTrack[] = [];
  spotifyTrack!: SpotifyTrack;
  keyword: string = "";
  currentAudio: HTMLAudioElement | null = null;
  showContent: boolean = false;
  selectedTrack: SpotifyTrack | null = null;
  isPlaying: boolean = false
  isInputFocused: boolean = false;
  currentTimeDisplay: string = '00:00';
  endTimeDisplay: string = '00:29';
  volumeValue: number = 0.5;
  secondsValue: number = 0;
  showVolumeIcon: boolean = false;
  userId: string = "";
  isFavorite: boolean = false;
  isSearchPage: boolean = false;
  isFavoritePage: boolean = false;
  spotifyTrack2!: SpotifyTrack;

  constructor(private spotifyService: SpotifyTrackService, private audioService: AudioService
    , private cookieService: CookieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchSongs(this.keyword);
    this.getSongsByUser();

    const storedTrack = this.cookieService.get('selectedTrack');
    this.userId = this.cookieService.get('userId');


    if (storedTrack) {
      this.selectedTrack = JSON.parse(storedTrack);
    }

    setInterval(() => {
      this.updateSliderPosition();
    }, 1000);

    this.route.url.subscribe(urlSegments => {
      this.isSearchPage = urlSegments.some(segment => segment.path === 'search');
      this.isFavoritePage = urlSegments.some(segment => segment.path === 'favorite');

      if (this.isSearchPage) {
        this.searchSongs(this.keyword);
      } else if (this.isFavoritePage) {
        this.getSongsByUser();
      }
    });
  }

  searchSongs(keyword: string) {
    this.spotifyService.searchSongs(keyword).subscribe((spotifyTracks) => {
      this.spotifyTracks = spotifyTracks;
    })
  }

  getSongsByUser() {
    this.spotifyService.getSongsByUser(this.userId).subscribe((spotifyTracks2) => {
      this.spotifyTracks2 = spotifyTracks2.filter(track => track.isFavorite === true);
    });
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

    this.cookieService.delete("selectedTrack")
    this.isPlaying = false;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
    this.volumeValue = 0.5;
    this.secondsValue = 0;
    this.isFavorite = false;
  }


  selectTrack(track: SpotifyTrack): void {
    this.selectedTrack = track;
    this.cookieService.set('selectedTrack', JSON.stringify(track))
    this.showContent = true;
  }

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
      this.currentAudio!.pause();
    } else if (this.selectedTrack) {
      this.playAudio(this.selectedTrack);
    }

    this.isPlaying = !this.isPlaying;
  }

  onVolumeChange(): void {
    if (this.currentAudio) {
      this.currentAudio.volume = this.volumeValue;
    }
  }

  updateSliderPosition(): void {
    if (this.currentAudio) {
      this.secondsValue = this.currentAudio.currentTime;
    }
  }

  onSecondsChange(): void {
    if (this.currentAudio) {
      this.currentAudio.currentTime = this.secondsValue;
      this.updateTimeDisplays();
    }
  }

  onSliderMouseEnter(): void {
    this.showVolumeIcon = true;
  }

  onSliderMouseLeave(): void {
    this.showVolumeIcon = false;
  }

  isMuted: boolean = false;
  previousVolumeValue: number = 0;

  toggleMute() {
    this.isMuted = !this.isMuted;

    this.volumeValue = this.isMuted ? 0 : 0.5;
  }

  getVolumeIcon(): string {
    if (this.isMuted || this.volumeValue === 0) {
      return 'volume_off';
    } else if (this.volumeValue < 0.5) {
      return 'volume_down';
    } else {
      return 'volume_up';
    }
  }

  addFavoriteSong() {
    this.spotifyTrack = JSON.parse(this.cookieService.get('selectedTrack'));

    this.spotifyService.addFavoriteSong(this.userId, this.spotifyTrack).subscribe(
      (spotifyTrack: SpotifyTrack) => {
        this.spotifyTrack.isFavorite = this.isFavorite;
        this.spotifyTrack = spotifyTrack;
      },
      (error) => {
        console.error('Error adding favorite song:', error);
      }
    );
  }

  isFavoriteSong() {
    this.spotifyService.isFavoriteSong(this.userId, this.spotifyTrack._id, this.isFavorite).subscribe(
      (spotifyTrack: SpotifyTrack) => {
        this.spotifyTrack = spotifyTrack;
      },
      (error) => {
        console.error('Error updating isFavorite status:', error);
      }
    );
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.addFavoriteSong();
    this.isFavoriteSong();
  }

  deleteFavoriteSong(id: string) {
    this.spotifyService.deleteFavoriteSong(id).subscribe(() => {
      this.spotifyTracks2 = this.spotifyTracks2.filter(song => song._id !== id);
      this.closeModal();
    });
  }
}
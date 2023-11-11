import { Component, OnInit } from '@angular/core';
import { SpotifyTrack } from 'src/app/models/SpotifyTrack';
import { SpotifyTrackService } from 'src/app/services/spotify-track.service';

@Component({
  selector: 'app-spotify-track',
  templateUrl: './spotify-track.component.html',
  styleUrls: ['./spotify-track.component.css']
})
export class SpotifyTrackComponent implements OnInit {

  spotifyTrack: SpotifyTrack[] = [];
  keyword: string = "";
  isPlaying: boolean[] = [];

  constructor(private spotifyService: SpotifyTrackService) { }

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

  isInputFocused: boolean = false;

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }


  currentAudio: HTMLAudioElement | null = null;
  currentTimeDisplay: string = '00:00';
  currentTime: number[] = [];

  toggleAudio(previewUrl: string, id: string, index: number): void {
    if (this.isPlaying[index]) {
      this.stopAudio(id);
    } else {
      this.playAudio(previewUrl, id, index);
    }
  }

  playAudio(previewUrl: string, id: string, index: number): void {
    // Stop any currently playing audio
    this.stopAudio(id);

    // Retrieve stored play state and time for the specific song
    const storedData = JSON.parse(localStorage.getItem(id) || '{}');
    const storedSongData = storedData[id] || {};

    // Create a new Audio element
    const audio = new Audio(previewUrl);

    // Set the current audio to the new element
    this.currentAudio = audio;

    // Set the current time to the stored time
    audio.currentTime = storedSongData.currentTime || 0;

    // Update the time display at regular intervals
    const timerInterval = 1000; // Update every 1 second
    const timerId = setInterval(() => {
      this.updateTimeDisplay();
    }, timerInterval);

    // Store the timerId along with other information
    storedSongData.timerId = timerId;

    // Start playing
    audio.play();

    // Set isPlaying to true for the specific track
    this.isPlaying[index] = true;
    this.currentTime[index] = storedSongData.currentTime !== undefined ? storedSongData.currentTime : 0;

    // Handle the end of audio playback
    audio.addEventListener('ended', () => {
      this.stopAudio(id);
    });
  }

  // Modify the stopAudio function to clear the timer for the specific song
  stopAudio(id: string): void {
    // Check if there is a currently playing audio
    if (this.currentAudio) {
      // Retrieve stored play state and time for the specific song
      const storedData = JSON.parse(localStorage.getItem(id) || '{}');
      const storedSongData = storedData[id] || {};

      // Clear the timer associated with the specific song
      clearInterval(storedSongData.timerId);

      // Store the current time and play state for the specific song
      storedData[id] = {
        currentTime: this.currentAudio.currentTime,
        isPlaying: false
      };
      localStorage.setItem(id, JSON.stringify(storedData));

      // Pause the audio without resetting its currentTime
      this.currentAudio.pause();

      // Set isPlaying to false for the specific track
      const index = this.spotifyTrack.findIndex(track => track.id === id);

      if (index !== -1) {
        this.isPlaying[index] = false;
      }

      // Remove the event listener to prevent multiple listeners on subsequent plays
      this.currentAudio.removeEventListener('ended', () => {
        this.stopAudio(id);
      });
    }
  }

  updateTimeDisplay(): void {
    // Check if there is a currently playing audio
    if (this.currentAudio) {
      // Update the time display based on the current time of the audio
      const minutes = Math.floor(this.currentAudio.currentTime / 60);
      const seconds = Math.floor(this.currentAudio.currentTime % 60);
      this.currentTimeDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }

  showContent: boolean = false;

  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  closeModal(id: string): void {
    this.showContent = false;
    localStorage.clear();
    this.stopAudio(id);
    // this.currentTime = [];
  }

  selectedTrack: SpotifyTrack | null = null;

  selectTrack(track: SpotifyTrack): void {
    this.selectedTrack = track;
    localStorage.setItem('selectedTrack', JSON.stringify(track));
    this.showContent = true;
    console.log('Selected Track:', this.selectedTrack);
  }
}

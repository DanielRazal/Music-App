import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyTrackComponent } from './components/spotify-track/spotify-track.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { AudioService } from './services/audio.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MyFavoriteSongsComponent } from './components/my-favorite-songs/my-favorite-songs.component';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from './components/menu/menu.component';
import { SearchSongsComponent } from './components/search-songs/search-songs.component';

@NgModule({
  declarations: [
    AppComponent,
    SpotifyTrackComponent,
    RegisterComponent,
    LoginComponent,
    MyFavoriteSongsComponent,
    MenuComponent,
    SearchSongsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [AudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }

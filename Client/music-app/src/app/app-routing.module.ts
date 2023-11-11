import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyTrackComponent } from './components/spotify-track/spotify-track.component';

const routes: Routes = [
  { path: '', redirectTo: '/spotify', pathMatch: 'full' },
  { path: 'spotify', component: SpotifyTrackComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

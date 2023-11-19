import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from 'src/app/services/alert.service';
import { SpotifyTrackService } from 'src/app/services/spotify-track.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userId: string = "";
  constructor(private cookieService: CookieService,
    private spotifyService: SpotifyTrackService,
    private alertService: AlertService, private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
  }

  logOut() {
    this.router.navigate(["login"])
    this.cookieService.deleteAll();
  }

  deleteSongsByUser() {
    this.alertService.delete().then((result) => {
      if (result.isConfirmed) {
        if (this.userId) {
          this.spotifyService.deleteSongsByUser(this.userId).subscribe((res: any) => {
            this.alertService.success("Success", res.message, `Status code: ${res.statusCode}`);
            this.router.navigate(["search"])
          },
            (error) => {
              if (error.error && error.error.message) {
                this.alertService.error("Error", error.error.message, `Status code: ${error.status}`);
              }
            }
          )
        }
      }
    })
  }

  deleteUser() {
    this.alertService.delete().then((result) => {
      if (result.isConfirmed) {
        if (this.userId) {
          this.userService.deleteUser(this.userId).subscribe((res) => {
            this.alertService.success("Success", res.message, `Status code: ${res.statusCode}`);
            this.logOut()
          },
            (error) => {
              if (error.error && error.error.message) {
                this.alertService.error("Error", error.error.message, `Status code: ${error.status}`);
              }
            });
        }
      }
    })
  }
}
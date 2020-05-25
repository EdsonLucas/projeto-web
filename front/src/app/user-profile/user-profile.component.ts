import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { GithubService } from '../github/github.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userDetails;
  info = <any>[];

  constructor(private userService: UserService, private router: Router, private githubService: GithubService) {
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];

        var str = this.userDetails.fullName.indexOf(" ", this.userDetails.fullName.indexOf(" ") + 1);
        var removeFullName = this.userDetails.fullName.substring(0, str);
        var result = removeFullName.replace(/\s/g, '');

        this.userDetails.fullName = result;

        this.githubService.getData(this.userDetails.fullName).subscribe((data) => {
          this.info = data;
          this.info['name'] = removeFullName;
        })

      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}

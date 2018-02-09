import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : Object;
  
  constructor(private authService : AuthService, private router : Router) {
    console.log(authService.loggedIn());
   }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile) => {
      this.user= localStorage.name;
    },
    err => {
      console.log(err);
      return false;
    }
  )
  }

}

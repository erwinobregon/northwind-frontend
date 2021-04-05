import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-logout',
  template: `
  <p>
    Logging out...
  </p>
  `
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private AuthService: AuthService) { }

  ngOnInit(): void {
    this.AuthService.logout();
    this.router.navigate(['/']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  logIn=false;
  user=null;
  
  constructor(public login: LoginService, private router:Router) {

  }

  ngOnInit(): void {
    this.logIn = this.login.isLogedIn();
    this.user = this.login.getUser();
  }

  redirectUser()
  {
    if(this.login.getUser().authorities[0].authority == "ADMIN")
    {
      this.router.navigate(['/admin/profile'])
    }
    else
    {
      this.router.navigate(['/user-dashboard/0']);
    }
  }

public logout() {
  this.login.logOut();
  this.logIn = false;
  this.user=null;
  // window.location.reload();
  window.location.href='/login'
}


}

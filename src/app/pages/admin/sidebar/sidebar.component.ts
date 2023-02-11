import { Component,OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  logIn=false;
  user=null;

  constructor(private login:LoginService){}
  ngOnInit(): void {
      
  }
  public logout() {
    this.login.logOut();
    this.logIn = false;
    this.user=null;
    // window.location.reload();
    window.location.href='/login'
}
}

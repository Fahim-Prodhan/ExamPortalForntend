import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginData = {
    username: '',
    password: '',
  };

  constructor(private snack: MatSnackBar, private login: LoginService, private router:Router) {}
  ngOnInit(): void {}

  formSubmit() {
    console.log('Login button click');
    
    

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        // console.log('Success');
        // console.log(data);

        //login.......
        this.login.LoginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) => {
        this.login.setUser(user);
        // console.log(user);

          // redirect....If ADMIN...Go to admin dashboard
          // rediect....If Normal...Go to normal dashboard

        // if(this.login.getUser().username=="admin") {
        //   console.log('admin is called');
        //   window.location.href ='/admin'
          
        // }
        // else {
        //   window.location.href='/user-dashboard'
        //   console.log("normal is called");         
        // }

        

        // window.location.href="/admin"
        //  console.log(this.login.getUserRole());
         
          
          if(this.login.getUser().authorities[0].authority == "ADMIN") 
          {
            //Admin dashboard
            console.log("admin working");
            
            window.location.href = '/admin/profile'

          }
          else if(this.login.getUser().authorities[0].authority == 'NORMAL')
          {
            //Normal user dashabord
            window.location.href='/user-dashboard/0';
          }
          else
          {
            this.login.logOut();
          }   

          //................debuging part.................
          // let admin = this.login.getUserRole();
          // console.log(admin);
          // if(admin=="ADMIN") 
          // {
          // console.log("admin is found");  
          // }
                   
            
        });
      },
      (error) => {
        console.log('Error');
        console.log(error);
        this.snack.open("Invaild Detail!!","try again",{
        duration:3000
        })
      }
    );
  }
}

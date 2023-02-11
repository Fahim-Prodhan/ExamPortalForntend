import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private userService:UserService, 
    private snack:MatSnackBar,
    private login:LoginService,
    private router:Router 
     ) {}

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };

  formSubmit() {
    if(this.user.username=='' || this.user.username == null) {
      // alert('User is required');
      this.snack.open("Usenname is required!!","close",{
        duration: 3000,
      })
      return;
    }

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        // console.log(data);
        // alert("success");
        Swal.fire({
          title: 'Congratulations?',
          text: "Register is Successful",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#fffff',
          confirmButtonText: 'OK!'
        }).then((restul)=>{
          if(restul.isConfirmed) {
            
              this.router.navigate(['/login']);
              // window.location.href='/login'
          }
        })
      },
      (error)=> {
        //error
        console.log(error);
        // alert("something is went wrong")
        this.snack.open("Something went wrong!!!", "", {
          duration:3000,
        })
      }
    )
  }

}

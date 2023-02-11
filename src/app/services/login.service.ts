import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public getCurrentUser() 
  {
    return this.http.get(`${baseUrl}/current-user`)
  }



  //Generate token

  public generateToken(loginData: any) {

    return this.http.post(`${baseUrl}/generate-token`,loginData)

  }


  //Login user: set token in Local Stroage

  public LoginUser(token:any) {
    localStorage.setItem('token',token)
    return true;
  }

  //isLogin: is user login or not

  public isLogedIn()
  {
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr == '' || tokenStr==null)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  // Logout: remove token from local stroage 
  public logOut() 
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;

  }

  //get token
  public getToken()
  {
    return localStorage.getItem("token");
  }

  //set user detail

  public setUser(user:any) 
  {
    localStorage.setItem("user",JSON.stringify(user));
  }

  //getUser

  public getUser()
  {
    let userStr=localStorage.getItem("user");
    if(userStr!=null) 
    {
      return JSON.parse(userStr);
    }
    else
    {
      this.logOut();
      return null;
    }
  }


  //get use role

  public getUserRole ()
  {
    let  user=this.getUser()
    return user.authorities;
  }


}

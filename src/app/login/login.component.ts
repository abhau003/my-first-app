import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   username:string;
   password:string;
  loginUserData = {
    "username":'',
    "password":''
  }
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  
  tryLogin(loginData){
    console.log(loginData);
    this.loginUserData.username=loginData.username;
    this.loginUserData.password=loginData.password;
    console.log(this.loginUserData);
    this.loginService.tryLogin(this.loginUserData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}

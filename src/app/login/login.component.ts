import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//3rd execute

  //properties
  aim="Your perfect banking partner";

  accounts="Enter ur acno here";

  // acno="";//1000
  // pswd="";//1000
  //user defined functions// 4th execute 

  
//registermodel
loginForm=this.fb.group({//group //* -regular expression
  //array
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})
  // acnoChange(event:any){
  //   this.acno=event.target.value;//1000
  //   console.log(this.acno);
    
  // }
  // pswdChange(event:any){
  //   this.pswd=event.target.value;
  //   console.log(this.pswd);
    
  // }
  login(){
    // alert('login clicked');
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    
    const result=this.ds.login(acno,pswd);
    if(this.loginForm.valid){
    if(result){
      alert("login successful");
      this.router.navigateByUrl('dashboard');
    }
    
  }
  else{
    alert('Login failed');
    console.log(this.loginForm.get('acno')?.errors);
    
  }
  }

  // login(a:any,p:any){
  //   // alert('login clicked');
  //   var acno=a.value;
  //   var pswd=p.value;
  //   var userDetails=this.userDetails;

  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       alert("login successfull");
  //     }
  //     else{
  //       alert("invalid password");
  //     }
  //   }else{
  //     alert("invalid user details");
  //   }
  // }

 
//router - variable of login
//Router -its a class of navigateByUrl
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }// 1st execute 
  //spl member function , automatically involks when an obj created

  ngOnInit(): void {//2nd execute - life cycle hooks of angular - 
    //initial process of component initialization
  }
 
}

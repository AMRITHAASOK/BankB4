import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  //login name display
  currentUser:any;

  //login acno 
  currentAcno:any;

  userDetails:any ={//object of objects
    1000:{acno:1000,username:'Jees',password:1000,balance:1000,transaction:[]},
    1001:{acno:1000,username:'Amal',password:1001,balance:1000,transaction:[]},
    1002:{acno:1000,username:'Sarath',password:1002,balance:1000,transaction:[]}
  }
  constructor() { 
    this.getDetails();
  }


  //saveDetails() - To store the details into the localStorage
  
  saveDetails(){//function definition
    if(this.userDetails){
      localStorage.setItem('dataBase',JSON.stringify(this.userDetails));
    }
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno));
    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    }
  }

  //getDetails() -To get details from localStorage

    getDetails(){
      if(localStorage.getItem('dataBase')){
        this.userDetails=JSON.parse(localStorage.getItem('dataBase')||'');
      }
      if(localStorage.getItem('currentAcno')){
        this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'');
      }
      if(localStorage.getItem('currentUser')){
        this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'');
      }
    }


  register(acno:any,username:any,password:any){
      var userDetails=this.userDetails;
      if(acno in localStorage){
        return false;
            }
            else{
              userDetails[acno]={
                acno,
                username,
                password,
                balance:0,
                transaction:[]
              }
              console.log(userDetails);
              this.saveDetails();//function call
              return true;
            }
  }
  login(acno:any,pswd:any){
    var userDetails=this.userDetails;
      if(acno in userDetails){
        if(pswd=userDetails[acno]['password']){
         this.currentUser = userDetails[acno]['username']
         this.currentAcno=acno; 
         this.saveDetails();//function call
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }

  }

  deposit(acno:any,pswd:any,amt:any)
  {
    let userDetails=this.userDetails;
    var amount=parseInt(amt);
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        userDetails[acno]['balance']+=amount;
        userDetails[acno]['transaction'].push({
          type:'Credit',
          amount
        })
        console.log(userDetails);
        this.saveDetails();//function call
        return userDetails[acno]['balance'];
      }
      else{
        alert('invalid password')
        return false;
      }
    }
    else{
      alert('invalid user details')
      return false;
    }

  }


  withdraw(acno:any,pswd:any,amt:any)
  {
 let userDetails=this.userDetails;
    var amount=parseInt(amt);
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        if(userDetails[acno]['balance']>amount){
        userDetails[acno]['balance']-=amount;
        userDetails[acno]['transaction'].push({
          type:'Debit',
          amount
        })
        console.log(userDetails);
        this.saveDetails();//function call
        return userDetails[acno]['balance'];
      }
    }
      else{
        alert('invalid password')
        return false;
      }
    }
    else{
      alert('invalid user details')
      return false;
    }

  }
  getTransaction(acno:any){
    return this.userDetails[acno]['transaction'];
  }


}

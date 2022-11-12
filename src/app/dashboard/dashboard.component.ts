import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//login display
user="";

  //deposit properties
acno="";
pswd="";
amount="";
//withdraw properties
acno1="";
pswd1="";
amount1="";
  constructor(private ds:DataService, private router:Router) {
    this.user=this.ds.currentUser;
   }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login');
      this.router.navigateByUrl('');
    }
  }
deposit(){
  var acno = this.acno;
  var pswd = this.pswd;
  var amount = this.amount;

  const result=this.ds.deposit(acno,pswd,amount);
  if(result){
    alert(`${amount} added successfully....balance:${result}`);
  }

}
withdraw(){
  var acno = this.acno1;
  var pswd = this.pswd1;
  var amount = this.amount1;

  const result=this.ds.withdraw(acno,pswd,amount);
  if(result){
    alert(`${amount} debited successfully....balance:${result}`);
  }
}
logout()
{
  //remove login name
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentAcno');


  //navigate to login page
  this.router.navigateByUrl('');
}
delete(){
  this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');
}
onCancel(){
  this.acno="";
}
}

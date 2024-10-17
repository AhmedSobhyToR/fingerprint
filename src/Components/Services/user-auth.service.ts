import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { mockUsers } from '../MockData/mockUser';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private users: User[]=[];
  private loggedUser!:User;
  constructor(private dataSer: DataService,  private router: Router) { 
    this.setUsers();
    // localStorage.removeItem('role')
  }

  setUsers(){
    this.users = mockUsers;
  }

  login(userName:string, password:string){
    const loggedUser = this.users.find(user=> user.name === userName)!;
    console.log(loggedUser);
    console.log(this.users);
    this.loggedUser = loggedUser;
    if(loggedUser!.password === password){
        // let token = '123';
        localStorage.setItem('role', loggedUser!.role);
        this.dataSer.setUser(this.currentUser);
          this.router.navigate(['/permit']);
    }
  }

  logout(){
    localStorage.removeItem('role')
  }
  
  get isUserLogin():boolean{
    if(localStorage.getItem('role')){
      return true;
    }
    else{
      return false;
    }
  }

  get currentUser(){
    return this.loggedUser;
  }
 
}

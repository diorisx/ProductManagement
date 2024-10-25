import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

export interface UserModel {
  id: number;
  username: string;
  email: number;
  role: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  isLoading: boolean = false;
  displayedColumns: string[] = ['username','email', 'role','edit','view']; // Asegúrate de que el orden aquí coincide con tu HTML
  userList: UserModel[] = [];


  constructor(private userService:UsersService, private router:Router){}

  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers() {
    this.isLoading = true;
    this.userService.getUsers().pipe(finalize(()=> this.isLoading = false)).subscribe({
      next: (res) => {
        this.userList = res;
      },
      error: (error) => {
        //console.log("Error getting product:", error);
      }
    });
  }
editUser(id:number){
  this.router.navigate(["/dashboard/edit-user/"+id]);

}


}

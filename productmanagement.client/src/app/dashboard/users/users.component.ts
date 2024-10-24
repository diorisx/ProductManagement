import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

export interface UserModel {
  id: number;
  username: string;
  email: number;
  role: number;
  // stock: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  displayedColumns: string[] = ['username','email', 'role','edit']; // Asegúrate de que el orden aquí coincide con tu HTML
  userList: UserModel[] = [];


  constructor(private userService:UsersService){}

  ngOnInit(): void {
    this.GetUsers();
  }

  public GetUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        // this.userList = [res]; // Asignar como un nuevo array
        this.userList = res;
      },
      error: (error) => {
        console.log("Error getting product:", error);
      }
    });
  }

}

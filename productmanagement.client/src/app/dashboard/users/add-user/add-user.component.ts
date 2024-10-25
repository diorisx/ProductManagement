import { Component, inject } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  private _snackBar = inject(MatSnackBar);
  user: UserModel = {}
  isLoading: boolean = false;

  constructor(private userService: UsersService){}


  roles: any[] = [
    {value: 'user', viewValue: 'User'},
    {value: 'admin', viewValue: 'Admin'},
  ];

  createUser(){
    if (!this.user.username || !this.user.email || !this.user.password){
      this._snackBar.open("Please set username, email and password","Ok", {duration:3000});
      return;
  }
    this.isLoading = true;
    this.userService.createUser(this.user).pipe(finalize(()=>this.isLoading = false))
    .subscribe({next:(res)=>{
      this._snackBar.open("User created","",{duration:3000});

    },
  error: (error)=>{
    console.log(error);
    this._snackBar.open(error.error,"",{duration:3000});
  }
  })

  }


}

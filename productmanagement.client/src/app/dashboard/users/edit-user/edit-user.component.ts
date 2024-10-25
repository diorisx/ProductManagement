import { Component, inject } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  private route = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);

  isLoading: boolean = false;
  user: UserModel = {};
  userId: Observable<number | undefined>;

  constructor(private userService:UsersService){
    this.userId = this.route.params.pipe(map((params) => params['id']));
  }


  roles: any[] = [
    {value: 'user', viewValue: 'User'},
    {value: 'admin', viewValue: 'Admin'},
  ];


  ngOnInit(): void {
    this.userId.subscribe((id) => {
      if (id != undefined) {
        this.getUser(id);
        return;
      }
    });
  
    
  }  

  getUser(id:number){
    this.userService.getUser(id).subscribe({
      next: (res: UserModel) => {
        this.user = res;
      },
      error: (err) => {
        this._snackBar.open('Error something went wrong', '', {
          duration: 2000,
        });
      },
    });
  }

  editUser(){
    this.isLoading = true;
    this.userService
      .editUser(this.user)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this._snackBar.open('User updated', '', { duration: 2000 });
        },
        error: (error) => {
          // console.log(error);
          this._snackBar.open(error.error, '', {
            duration: 2000,
          });
        },
      });
  }



}

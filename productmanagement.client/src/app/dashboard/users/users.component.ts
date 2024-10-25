import { Component, inject } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../../core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../layout/dialog/dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  readonly _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  readonly displayedColumns: string[] = ['username', 'email', 'role', 'edit', 'view']; // Asegúrate de que el orden aquí coincide con tu HTML
  isLoading: boolean = false;
  userList: UserModel[] = [];


  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (res) => {
        this.userList = res;
      },
      error: (error) => {
        //console.log("Error getting product:", error);
      }
    });
  }
  editUser(id: number) {
    this.router.navigate(["/dashboard/edit-user/" + id]);

  }

  deleteUser(id:number){
    this.dialog.open(DialogComponent,{
      data:{message: "This user will be deleted permanently"}}).afterClosed().subscribe(result => {
        if(result){
          this.isLoading = true;
          this.userService
            .deleteUser(id)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
              next: (res) => {
                this.getUsers();
                this._snackBar.open("User deleted","",{duration:3000});
              },
              error: (error) => {
                console.log('Error deleting the user:', error);
              },
            });
        }
      });
    
  }



}

import { Component, inject, ViewChild } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../../core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../layout/dialog/dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


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
  search:string = "";

  totalItems: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers({query:this.search, pageSize:this.pageSize,pageNumber:this.pageIndex+1})
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (res) => {
        this.userList = res.users;
        this.totalItems = res.totalItems;

      },
      error: (error) => {
        //console.log("Error getting product:", error);
      }
    });
  }

  editUser(id: number) {
    this.router.navigate(["/dashboard/edit-user/" + id]);

  }

  getByName(){
    this.isLoading = true;
    this.userService
    .getUsers({query:this.search, pageSize:this.pageSize, pageNumber:this.pageIndex+1})
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (res) => {
        this.userList = res.users;
        this.totalItems = res.totalItems;
      },
      error: (error) => {
        console.log('Error getting the users:', error);
      },
    });
    
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

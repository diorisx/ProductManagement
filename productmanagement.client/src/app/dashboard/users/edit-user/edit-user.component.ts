import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

export interface UserModel {
  id?: number;
  username?: string;
  email?: number;
  role?: number;
}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  private route = inject(ActivatedRoute);
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
  
    
  }  

  getUser(id:number){

  }

  editUser(){

  }



}

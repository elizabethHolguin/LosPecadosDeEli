import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  active = 1;
  seen_options;
  
  public userForm;

  constructor(
    private formBuilder: FormBuilder,
    public authservice: AuthService,
    public appService: ApplicationStateService,
    public commentService: CommentService
  ) {
    this.userForm = this.formBuilder.group({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      direction : '',
      city: ''
    });
  }

  ngOnInit(): void {
    this.commentService.getComments();
  }

  async onSubmit(creden){
    if(creden.email && !creden.email.includes('@'))
      this.appService.catchError(3);
    else {
      let credentials_user = {
        username : (creden.username)? creden.username: (await this.authservice.getUser()).username,
        first_name: (creden.first_name)? creden.first_name: (await this.authservice.getUser()).first_name,
        last_name: (creden.last_name)? creden.last_name: (await this.authservice.getUser()).last_name,
        email: (creden.email)? creden.email : (await this.authservice.getUser()).email,
      };

      let creadentials_client = {
        userID : this.authservice.client$.userID,
        direction : (creden.direction)? creden.direction : this.authservice.client$.direction,
        city: (creden.city)? creden.city: this.authservice.client$.city
      };

      this.authservice.updateaccount(credentials_user, creadentials_client);
    }
  }

}

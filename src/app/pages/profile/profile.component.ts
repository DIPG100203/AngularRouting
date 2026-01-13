/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from "../../cms/cms-routing.module";





@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CmsRoutingModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  user: User | null = null;
  token = ''

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private auth: AuthService
  ) {}

  ngOnInit(): void {

    this.auth.user$
    .subscribe(data => {
      this.user = data
    })
    
  }

  /* this.auth.profile().subscribe(data => {
      this.user = data
    }) */

}

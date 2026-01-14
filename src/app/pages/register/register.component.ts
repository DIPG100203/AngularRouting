/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { OnExit } from '../../models/on-exit';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnExit{


  OnExit(): boolean {
    return confirm('ARE YOU SURE???')
  }

}

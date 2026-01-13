import { Component } from '@angular/core';
import { CmsRoutingModule } from "../../cms-routing.module";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CmsRoutingModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}

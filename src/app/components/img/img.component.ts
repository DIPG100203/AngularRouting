import { CommonModule } from '@angular/common';
import { Component,  Input, 
  Output, EventEmitter, 
  
  
 } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-img',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss'
})
export class ImgComponent   {

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  img: string = '';

  
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') set changeImg(newImg: string) {
    this.img = newImg;
  }

  @Input() alt = '';

  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://picsum.photos/200'

  constructor() {
    // solo se corre una vez
    //console.log('Constructor', 'imgValue =>', this.img)
  }

  /* ngOnChanges() {
    // se corre cada vez que cambia una propiedad de entrada (input)
    console.log('ngOnChanges', 'imgValue =>', this.img)
  } */

  /* ngOnInit()  {
    // solo se corre una vez despues del constructor
    console.log('ngOnInit', 'imgValue =>', this.img)
  }

  ngAfterViewInit() {
    // se corre despues de que se renderiza la vista y se maneja los hijos
    console.log('ngAfterViewInit');    
  }

  ngOnDestroy() {
    // se corre justo antes de que el componente sea destruido
    console.log('ngOnDestroy');    
  } */

  imgError(){

    this.img = this.imageDefault;

  }

  imgLoad() {
    this.loaded.emit(this.img);
  }
}

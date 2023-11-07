import { Component, Input, ElementRef } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
  styleUrls: ['./grid-product.component.scss'],
})
export class GridProductComponent {

  @Input() gridProductTitle: string = 'Producto';
  @Input() gridProductPrice: number = 0;
  animation: Animation | undefined; // Inicializamos la propiedad como undefined

  constructor(private animationCtrl: AnimationController, private el: ElementRef) {}

  startAnimationOnHover() {
    if (!this.animation) {
      this.animation = this.animationCtrl.create()
        .addElement(this.el.nativeElement)
        .duration(200)
        .easing('ease-in');
    }

    const isElevated = this.el.nativeElement.classList.contains('elevated');
    this.animation
      .fromTo('transform', isElevated ? 'translateY(-10px)' : 'translateY(0)', isElevated ? 'translateY(0)' : 'translateY(-10px)')
      .play();

    this.el.nativeElement.classList.toggle('elevated');
  }
}

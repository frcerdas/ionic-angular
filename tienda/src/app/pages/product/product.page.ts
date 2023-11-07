import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  pageProductTitle: string = 'Producto';
  pageProductPrice: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageProductTitle = params['pageProductTitle'] || 'Producto';
      this.pageProductPrice = parseFloat(params['pageProductPrice']) || 0;
    });
  }
}

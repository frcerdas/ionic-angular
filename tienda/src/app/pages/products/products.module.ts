import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MapaComponent } from 'src/app/components/mapa/mapa.component';
import { GridProductComponent } from 'src/app/components/grid-product/grid-product.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [
    ProductsPage,
    HeaderComponent,
    MapaComponent,
    GridProductComponent
  ]
})
export class ProductsPageModule {}

// carrito.page.ts

import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';  // Import MenuController

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carritoItems: any[] = [];

  constructor(
    private http: HttpClient,
    private menuController: MenuController  // Inject MenuController
  ) {
    this.loadCarritoItems();
  }

  ngOnInit() {
  }

  async loadCarritoItems() {
    try {
      const db: SQLiteObject = await SQLite.create({
        name: 'mydatabase.db',
        location: 'default',
      });

      const result = await db.executeSql('SELECT * FROM carrito', []);

      for (let i = 0; i < result.rows.length; i++) {
        const carritoItem = {
          id_transaccion: result.rows.item(i).id_transaccion,
          cantidad: 1, // Always 1 as specified
          id_producto: result.rows.item(i).id_producto,
          fecha_hora: result.rows.item(i).fecha_hora,
          nombre_producto: '', // Placeholder for product name
        };

        // Fetch product name from the local API
        this.fetchProductName(carritoItem);

        this.carritoItems.push(carritoItem);
      }
    } catch (e) {
      console.error('Error al cargar los elementos del carrito', e);
    }
  }

  async fetchProductName(carritoItem: any) {
    try {
      const productsJson = await this.http.get('/assets/json/products.json').toPromise();
      const products = productsJson as any[];

      const matchingProduct = products.find(product => product.id === carritoItem.id_producto);

      if (matchingProduct) {
        carritoItem.nombre_producto = matchingProduct.nombre;
      }
    } catch (e) {
      console.error('Error al obtener el nombre del producto', e);
    }
  }

  async borrarCarrito() {
    try {
      const db: SQLiteObject = await SQLite.create({
        name: 'mydatabase.db',
        location: 'default',
      });

      await db.executeSql('DELETE FROM carrito', []);
      this.carritoItems = []; // Clear the local array
    } catch (e) {
      console.error('Error al borrar el carrito', e);
    }
  }

  async borrarItem(idTransaccion: number) {
    try {
      const db: SQLiteObject = await SQLite.create({
        name: 'mydatabase.db',
        location: 'default',
      });

      await db.executeSql('DELETE FROM carrito WHERE id_transaccion = ?', [idTransaccion]);

      // Remove the item from the local array
      this.carritoItems = this.carritoItems.filter(item => item.id_transaccion !== idTransaccion);
    } catch (e) {
      console.error('Error al borrar el ítem del carrito', e);
    }
  }

  closeMenu() {
    this.menuController.close();  // Close the menu
  }
}

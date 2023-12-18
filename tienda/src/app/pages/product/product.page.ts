import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  pageProductTitle: string = 'Producto';
  pageProductPrice: number = 0;
  idProducto: number = 0;

  constructor(
    private route: ActivatedRoute,
    private platform: Platform,
    private router: Router,
    private menuController: MenuController
  ) {
    this.platform.ready().then(() => {
      this.createDatabase();
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageProductTitle = params['nombre'] || 'Producto';
      const precioString = String(params['precio']); // Asegúrate de que sea una cadena
      this.pageProductPrice = isFinite(Number(precioString)) ? parseFloat(precioString) : 0;
      console.log('Precio obtenido de params:', this.pageProductPrice);
      this.idProducto = parseInt(params['id_producto']) || 0;
    });
  }

  async createDatabase() {
    try {
      const db: SQLiteObject = await SQLite.create({
        name: 'mydatabase.db',
        location: 'default',
      });

      await db.executeSql('CREATE TABLE IF NOT EXISTS carrito (id_transaccion INTEGER PRIMARY KEY AUTOINCREMENT, id_producto INTEGER, fecha_hora TEXT)', []);
    } catch (e) {
      console.error('Error al abrir/crear la base de datos', e);
    }
  }

  async agregarAlCarrito() {
    try {
      const db: SQLiteObject = await SQLite.create({
        name: 'mydatabase.db',
        location: 'default',
      });

      const timestamp = new Date().toISOString();
      const result = await db.executeSql('INSERT INTO carrito (id_producto, fecha_hora) VALUES (?, ?)',
        [this.idProducto, timestamp]);

      const idTransaccion = result.insertId; // Retrieve the auto-generated id_transaccion

      console.log('Producto añadido al carrito con id_transaccion:', idTransaccion);
      this.router.navigate(['/carrito']); // Redirect to the /carrito page
    } catch (e) {
      console.error('Error al añadir producto al carrito', e);
    } finally {
      this.closeMenu();  // Close the menu after adding the product to the cart
    }
  }

  closeMenu() {
    this.menuController.close();
  }

  openMenu() {
    this.menuController.open();
  }
}

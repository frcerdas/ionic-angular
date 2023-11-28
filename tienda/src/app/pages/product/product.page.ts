import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  pageProductTitle: string = 'Producto';
  pageProductPrice: number = 0;
  idProducto: number = 0; // Initialize the property

  constructor(
    private route: ActivatedRoute,
    private platform: Platform,
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.createDatabase();
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageProductTitle = params['pageProductTitle'] || 'Producto';
      this.pageProductPrice = parseFloat(params['pageProductPrice']) || 0;
      this.idProducto = parseInt(params['idProducto']) || 0;
    });
  }

  createDatabase() {
    SQLite.create({
      name: 'mydatabase.db',
      location: 'default',
    })
      .then((db: SQLiteObject) => {
        if (db) {
          db.executeSql('CREATE TABLE IF NOT EXISTS carrito (cantidad INTEGER, id_producto INTEGER, fecha_hora TEXT)', [])
            .then(() => console.log('Tabla creada'))
            .catch(e => console.error('Error al crear la tabla', e));
        } else {
          console.error('Error: La base de datos no se creó correctamente.');
        }
      })
      .catch(e => console.error('Error al abrir la base de datos', e));
  }


  agregarAlCarrito() {
    SQLite.create({
      name: 'mydatabase.db',
      location: 'default',
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO carrito (cantidad, id_producto, fecha_hora) VALUES (?, ?, ?)',
          [1, this.idProducto, new Date().toISOString()])
          .then(() => {
            console.log('Producto añadido al carrito');
            this.router.navigate(['/carrito']); // Redirige a la página /carrito
          })
          .catch(e => console.error('Error al añadir producto al carrito', e));
      })
      .catch(e => console.error('Error al abrir la base de datos', e));
  }
}

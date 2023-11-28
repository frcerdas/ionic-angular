import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {

  carritoItems: any[] = [];

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.readCarritoItems();
    });
  }

  readCarritoItems() {
    SQLite.create({
      name: 'mydatabase.db',
      location: 'default',
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM carrito', [])
          .then((data) => {
            this.carritoItems = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                this.carritoItems.push(data.rows.item(i));
              }
            }
          })
          .catch(e => console.error('Error al ejecutar la consulta', e));
      })
      .catch(e => console.error('Error al abrir la base de datos', e));
  }
}

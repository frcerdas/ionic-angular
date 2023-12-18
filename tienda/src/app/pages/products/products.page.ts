import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  usuario: any = {};
  productos: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Obtener datos del usuario desde el servicio
    this.usuario = this.usuarioService.getUsuario();
    this.cargarProductos();
  }

  cargarProductos() {
    // Ruta al archivo JSON local
    const jsonUrl = 'assets/json/products.json';

    // Hacer la solicitud HTTP al archivo JSON
    this.http.get<any[]>(jsonUrl).subscribe(
      (data) => {
        this.productos = data.map(product => ({
          id_producto: product.id_producto,
          nombre: product.nombre,
          foto_url: product.foto_url,
          categoria: product.categoria,
          precio: product.precio,
        }));

        // Mueve el console.log aquí para que se ejecute después de asignar los productos
        console.log('Productos cargados:', this.productos);
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  verDetalleProducto(producto: any) {
    console.log('Producto seleccionado:', producto);

    this.navCtrl.navigateForward('/product', {
      queryParams: {
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        precio: Number(producto.precio),
        // Agrega otros campos que desees pasar
      },
    });
  }
}

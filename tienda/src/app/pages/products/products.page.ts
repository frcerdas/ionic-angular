// products.page.ts

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
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
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }
}

// perfil.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage {
  usuario: any = {}; // Inicializa el objeto usuario

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ionViewWillEnter() {
    // Obtener datos del usuario desde el servicio
    this.usuario = this.usuarioService.getUsuario();
  }

  guardarPerfil() {
    // Guardar datos del usuario en LocalStorage
    this.usuarioService.guardarUsuario(this.usuario);

    // Navegar a la página de productos después de guardar
    this.router.navigate(['/products']);
  }
}

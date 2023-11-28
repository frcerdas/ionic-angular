// usuario.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private claveLocalStorage = 'usuario';

  constructor() {}

  getUsuario() {
    // Obtener datos del usuario desde LocalStorage
    const usuarioString = localStorage.getItem(this.claveLocalStorage);
    return usuarioString ? JSON.parse(usuarioString) : {};
  }

  guardarUsuario(usuario: any) {
    // Guardar datos del usuario en LocalStorage
    localStorage.setItem(this.claveLocalStorage, JSON.stringify(usuario));
  }
}

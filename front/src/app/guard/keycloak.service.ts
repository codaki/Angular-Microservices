import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;

  private get keycloak(): Keycloak {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080', // Asegúrate de que esta URL sea la correcta para tu entorno
        realm: 'estudiantes-cursos',
        clientId: 'frontend'
      });
    }
    return this._keycloak;
  }

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init(): Promise<void> {
    console.log("Inicializando Keycloak...");
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
      //pkceMethod: 'S256', // Debe coincidir con el valor configurado en Keycloak
      //redirectUri: 'http://localhost:4200', // Ajusta esta URL según sea necesario
      checkLoginIframe: false // Desactiva el iframe de verificación
    });

    if (authenticated) {
      this._profile = await this.keycloak.loadUserProfile() as UserProfile;
      this._profile.token = this.keycloak.token || '';
    }
  }

  login(): Promise<void> {
    return this.keycloak.login();
  }

  logout(): Promise<void> {
    return this.keycloak.logout({
      redirectUri: 'http://localhost:4200'
    });
  }
}

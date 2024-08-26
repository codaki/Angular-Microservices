import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { routes } from './app/app.routes';
import { KeycloakService } from './app/guard/keycloak.service';
export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule // Agrega HttpClientModule aquí
    ),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    },
  ]
}).catch((err) => console.error(err));

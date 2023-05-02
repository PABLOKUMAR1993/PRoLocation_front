import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  // Constructor

  /**
   * Inyecto el servicio de autenticación para obtener el token.
   */
  constructor(private authService: AuthService) {}


  // Métodos

  /**
   * Método que intercepta las peticiones y añade el token a la cabecera.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Añado el token a la cabecera de cada petición.
    const tokenizeRes = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeRes);
  }

}

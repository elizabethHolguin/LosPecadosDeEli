import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {
  public waitPage$: boolean;
  public messageWait$: string;

  public error$: string;

  constructor() {
    this.waitPage$ = false;
  }

  public showLoadingScreen(){
    this.waitPage$ = true;
  }

  public noShowLoadingScreen(){
    this.waitPage$ = false;
    this.messageWait$ = undefined;
  }

  public clearError(): void{
    this.error$ = undefined;
  }

  public changeMessage(message: string){
    this.messageWait$ = message;
  }

  public catchError(error: number): void{
    switch (error) {
      case 0:
        this.error$ = 'Error interno, intente mas tarde.';
        break;
      case 1:
        this.error$ = 'Contraseña inválida, mínimo 8 caracteres.';
        break;
      case 2:
        this.error$ = 'Las contraseñas no son iguales.';
        break;
      case 3:
        this.error$ = 'Correo invalido.';
        break;
      case 4:
        this.error$ = 'Rellene todos los campos.';
        break;
      case 5:
        this.error$ = 'Usuario ya registrado.';
        break;
      case 400:
        this.error$ = 'Credenciales incorrectas.';
        break;
    }
  }
}

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestorege: AngularFireStorage) {}

  async uploadCloudStorage(nombreArchivo: string, datos: any) {
    return this.firestorege.upload(nombreArchivo, datos);
  }

  public refCloudStorage(nombreArchivo: string){
    return this.firestorege.ref(nombreArchivo);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taller } from '../models/taller';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TallerService{

    private url: string = 'http://localhost:8080/api/v1/taller';

    constructor(private http: HttpClient) {}
    // Listar todos los tipos
  getAll(): Observable<Taller[]> {
    return this.http.get<Taller[]>(this.url);
  }

  // Buscar tipo por ID
  getById(id: number): Observable<Taller> {
    return this.http.get<Taller>(`${this.url}/${id}`);
  }

  // Crear tipo
  create(taller: Taller): Observable<Taller> {
    return this.http.post<Taller>(this.url, taller);
  }

  // Actualizar tipo
  update(id: number, taller: Taller): Observable<Taller> {
    return this.http.put<Taller>(`${this.url}/${id}`, taller);
  }

  // Eliminar tipo
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  
}

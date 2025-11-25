import { Injectable } from '@angular/core';
import { TipoMantenimiento } from '../models/tipo-mantenimiento';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TipoMantenimientoService {

  private url = 'http://localhost:8080/api/v1/tipomant'; // <-- Ajusta tu endpoint real

  constructor(private http: HttpClient) {}

  // Listar todos los tipos de mantenimiento
  getAll(): Observable<TipoMantenimiento[]> {
    return this.http.get<TipoMantenimiento[]>(this.url);
  }

  // Buscar tipo de mantenimiento por ID
  getById(id: number): Observable<TipoMantenimiento> {
    return this.http.get<TipoMantenimiento>(`${this.url}/${id}`);
  }

  // Crear tipo de mantenimiento
  create(tp: TipoMantenimiento): Observable<TipoMantenimiento> {
    return this.http.post<TipoMantenimiento>(this.url, tp);
  }

  // Actualizar tipo de mantenimiento
  update(id: number, tp: TipoMantenimiento): Observable<TipoMantenimiento> {
    return this.http.put<TipoMantenimiento>(`${this.url}/${id}`, tp);
  }

  // Eliminar tipo de mantenimiento
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {

   private url: string = 'http://localhost:8080/api/v1/estado';

    constructor(private http: HttpClient) {}
    // Listar todos los tipos
  getAll(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.url);
  }

  // Buscar tipo por ID
  getById(id: number): Observable<Estado> {
    return this.http.get<Estado>(`${this.url}/${id}`);
  }

  // Crear tipo
  create(estado: Estado): Observable<Estado> {
    return this.http.post<Estado>(this.url, estado);
  }

  // Actualizar tipo
  update(id: number, estado: Estado): Observable<Estado> {
    return this.http.put<Estado>(`${this.url}/${id}`, estado);
  }

  // Eliminar tipo
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  
}

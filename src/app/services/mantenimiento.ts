import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mantenimiento } from '../models/mantenimiento';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root',
})
export class MantenimientoService {

  private url: string = 'http://localhost:8080/api/v1/mantenimiento';

   constructor(private http: HttpClient) {}

  // Listar todos los proveedores
  getAll(): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(this.url);
  }

  // Buscar proveedor por ID
  getById(id: number): Observable<Mantenimiento> {
    return this.http.get<Mantenimiento>(`${this.url}/${id}`);
  }

  // Crear nuevo proveedor (con referencia a tipo)
  create(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    return this.http.post<Mantenimiento>(this.url, mantenimiento);
  }

  // Actualizar proveedor
  update(id: number, mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    return this.http.put<Mantenimiento>(`${this.url}/${id}`, mantenimiento);
  }

  // Eliminar proveedor
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Obtener proveedores por tipo
  getByTipo(Id: number): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(`${this.url}/vehiculo/${Id}`);
  }
  
}

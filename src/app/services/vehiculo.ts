import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {

   private url: string = 'http://localhost:8080/api/v1/vehiculo';

   constructor(private http: HttpClient) {}

  // Listar todos los proveedores
  getAll(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.url);
  }

  // Buscar proveedor por ID
  getById(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.url}/${id}`);
  }

  // Crear nuevo proveedor (con referencia a tipo)
  create(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.url, vehiculo);
  }

  // Actualizar proveedor
  update(id: number, vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.url}/${id}`, vehiculo);
  }

  // Eliminar proveedor
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Obtener proveedores por tipo
  getByTipo(tipoId: number): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.url}/tipo/${tipoId}`);
  }

  actualizarEstado(idVehiculo: number, estadoId: number) {
  return this.http.put(
    `${this.url}/${idVehiculo}/estado?estadoId=${estadoId}`,
    {}
  );
  }
  private refrescar$ = new Subject<void>();

refrescarVehiculos() {
  return this.refrescar$.asObservable();
}

emitirRefresh() {
  this.refrescar$.next();
}

  
}

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo';
import { Estado } from '../../models/estado';

@Component({
  selector: 'app-vehiculo',
  imports: [Sidebar, CommonModule, ReactiveFormsModule],
  templateUrl: './vehiculo.html',
  styleUrl: './vehiculo.css',
})
export class VehiculoComponent {

  @ViewChild('modal') modalRef!: ElementRef<HTMLDivElement>;
  private bsModal: any;
  private fb = inject(FormBuilder);

  vehiculos: Vehiculo[] = [];
  tituloModal = "Nuevo Vehículo";
  editId: number | null = null;

  form = this.fb.group({
    placa: ['', [Validators.required, Validators.minLength(5)]],
    modelo: ['', [Validators.required]],
    anio: [null as number | null, [Validators.required]],
    volumen: [null as number | null, [Validators.required]],
    estado: ['', Validators.required]   // nombre




  });

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.listar();
     this.vehiculoService.refrescarVehiculos()
    .subscribe(() => this.listar());
  }

  listar() {
    this.vehiculoService.getAll()
      .subscribe(response => this.vehiculos = response);
  }

  abrirNuevo() {
    this.tituloModal = "Nuevo Vehículo";
    this.editId = null;
    this.form.reset();
    this.showModal();
  }

  abrirEditar(v: Vehiculo) {
    this.tituloModal = "Editar Vehículo";
    this.editId = v.id!;

    this.form.patchValue({
      placa: v.placa,
      modelo: v.modelo,
      anio: v.anio,
      volumen: v.volumen,
       estado: v.estado?.estado 

    });

    this.showModal();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar Vehículo?')) {
      this.vehiculoService.delete(id)
        .subscribe(() => this.listar());
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const dto: Vehiculo = {
      id: this.editId || undefined,
      placa: this.form.value.placa!,
      modelo: this.form.value.modelo!,
      anio: this.form.value.anio!,
      volumen: this.form.value.volumen!,
      estado: { id: Number(this.form.value.estado) }
// Envías SOLO el ID del estado

    };

    const obs = this.editId
      ? this.vehiculoService.update(this.editId, dto)
      : this.vehiculoService.create(dto);

    obs.subscribe({
      next: () => {
        this.hideModal();
        this.listar();
        this.vehiculoService.emitirRefresh();
      }
    });
  }

    private showModal() {
    const m = this.modalRef.nativeElement;
    // @ts-ignore – Bootstrap global (bundle script en angular.json)
    this.bsModal = new bootstrap.Modal(m);
    this.bsModal.show();
  }

  private hideModal() {
    if (this.bsModal) {
      this.bsModal.hide();
    }
  }

}

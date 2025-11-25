import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mantenimiento } from '../../models/mantenimiento';
import { MantenimientoService } from '../../services/mantenimiento';
import { VehiculoService } from '../../services/vehiculo';
import { TipoMantenimientoService } from '../../services/tipo-mantenimiento';
import { TallerService } from '../../services/taller';

@Component({
  selector: 'app-mantenimiento',
  imports: [Sidebar, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './mantenimiento.html',
  styleUrl: './mantenimiento.css',
})
export class MantenimientoComponent {

  @ViewChild('modal') modalRef!: ElementRef<HTMLDivElement>;
  @ViewChild('modalActualizar') modalActualizarRef!: ElementRef<HTMLDivElement>;

  private bsModal: any;
  private bsModalActualizar: any;

  private fb = inject(FormBuilder);

  busqueda: string = '';

  // Listas
  mantenimientos: Mantenimiento[] = [];
  vehiculos: any[] = [];
  tipos: any[] = [];
  talleres: any[] = [];

  tituloModal = "Registrar mantenimiento";
  editId: number | null = null;

  // FORM 1 → Registrar mantenimiento
  form = this.fb.group({
    fechaInicio: ['', Validators.required],
    fecha_fin: [''],
    proximoMant: [''],
    detalle2: [''],
    vehiculo: [null as number | null],
    tipo_mantenimiento: [null as number | null, Validators.required],
    detalles: ['', [Validators.required, Validators.minLength(3)]],
    taller: [null as number | null, Validators.required],
    placa: [''],
    marca: [''],
    modelo: ['']
  });

  // FORM 2 → Actualizar datos
  formActualizar = this.fb.group({
    fechaInicio: [''],
    fecha_fin: [''],
    proximoMant: [''],
    detalle2: ['']
  });

  // Solo para mostrar
  placa: string = '';
  marca: string = '';
  modelo: string = '';

  constructor(
    private mantService: MantenimientoService,
    private vehiculoService: VehiculoService,
    private tipoMantService: TipoMantenimientoService,
    private tallerService: TallerService
  ) {}

  ngOnInit(): void {
    this.listar();
    this.cargarCombos();
  }

  listar() {
    this.mantService.getAll().subscribe(r => this.mantenimientos = r);
  }

  cargarCombos() {
    this.vehiculoService.getAll().subscribe(r => this.vehiculos = r);
    this.tipoMantService.getAll().subscribe(r => this.tipos = r.filter(t => t.nombre === 'Correctivo'));
    this.tallerService.getAll().subscribe(r => this.talleres = r);
  }

  abrirNuevoDesdeVehiculo(v: any) {
    this.tituloModal = "Registrar mantenimiento";
    this.editId = null;

    this.form.reset();

    this.form.patchValue({
      placa: v.placa,
      marca: v.marca,
      modelo: v.modelo,
      vehiculo: v.id
    });

    this.placa = v.placa;
    this.marca = v.marca;
    this.modelo = v.modelo;

    this.showModal();
  }

  abrirEditarReg(m: Mantenimiento) {
  if (m.estado === 'En mantenimiento') {
    alert('Este vehículo ya está en mantenimiento. No puedes registrar otro mantenimiento.');
    return;
  }
    this.tituloModal = "Editar mantenimiento";

    this.editId = m.id!;

    this.form.patchValue({
      fechaInicio: m.fechaInicio,
      fecha_fin: m.fecha_fin,
      proximoMant: m.proximoMant,
      detalle2: m.detalle2,
      vehiculo: m.vehiculo,
      tipo_mantenimiento: m.tipo_mantenimiento,
      detalles: m.detalles,
      taller: m.taller,
      placa: m.placa,
      marca: m.marca,
      modelo: m.modelo
    });

    this.placa = m.placa!;
    this.marca = m.marca!;
    this.modelo = m.modelo!;

    this.showModal();
  }

  // 🟦 MODAL ACTUALIZAR DATOS
  Editardatos(m: Mantenimiento) {
    this.editId = m.id!;

    this.formActualizar.patchValue({
      fechaInicio: m.fechaInicio,
      fecha_fin: m.fecha_fin,
      proximoMant: m.proximoMant,
      detalle2: m.detalle2
    });

    const modal = this.modalActualizarRef.nativeElement;
    // @ts-ignore
    this.bsModalActualizar = new bootstrap.Modal(modal);
    this.bsModalActualizar.show();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar mantenimiento?')) {
      this.mantService.delete(id).subscribe(() => this.listar());
    }
  }

  get listaFiltrada() {
    if (!this.busqueda.trim()) return this.mantenimientos;
    const texto = this.busqueda.toLowerCase();
    return this.mantenimientos.filter(m =>
      m.placa?.toLowerCase().includes(texto)
    );
  }

  // GUARDAR REGISTRO (modal registrar)
  guardar() {
    if (this.form.invalid) return;

    const dto: Mantenimiento = {
      id: this.editId || undefined,
      fechaInicio: this.form.value.fechaInicio!,
      fecha_fin: null, 
      proximoMant: this.form.value.proximoMant ?? '',
      detalles: this.form.value.detalles!,
      vehiculo: Number(this.form.value.vehiculo),
      detalle2: this.form.value.detalle2 ?? '',
      tipo_mantenimiento: Number(this.form.value.tipo_mantenimiento),
      taller: this.form.value.taller!,
      placa: this.placa,
      marca: this.marca,
      modelo: this.modelo
    };

    const obs = this.editId
      ? this.mantService.update(this.editId, dto)
      : this.mantService.create(dto);

    obs.subscribe(() => {
      this.hideModal();
      this.listar();
    });
  }

  // GUARDAR ACTUALIZACIÓN (modal actualizar)
  hoy = new Date().toISOString().split('T')[0];
  guardarActualizacion() {
    const f = this.formActualizar.value;
    
  
  if (f.fechaInicio && f.fecha_fin && f.fecha_fin < f.fechaInicio) {
    alert("La fecha fin no puede ser menor que la fecha de inicio");
    return;
  }

    const dto: Mantenimiento = {
      id: this.editId!,
      fechaInicio: this.formActualizar.value.fechaInicio!,
      fecha_fin: this.formActualizar.value.fecha_fin === '' ? null : this.formActualizar.value.fecha_fin!,
      proximoMant: this.formActualizar.value.proximoMant ?? '',
      detalle2: this.formActualizar.value.detalle2 ?? ''
    };

    this.mantService.update(this.editId!, dto).subscribe(() => {
      this.bsModalActualizar.hide();
      this.listar();
    });
    
  }

  private showModal() {
    const m = this.modalRef.nativeElement;
    // @ts-ignore
    this.bsModal = new bootstrap.Modal(m);
    this.bsModal.show();
  }

  private hideModal() {
    if (this.bsModal) this.bsModal.hide();
  }
}

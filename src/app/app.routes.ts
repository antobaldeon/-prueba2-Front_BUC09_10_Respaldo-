import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { MantenimientoComponent } from './components/Secretaria/mantenimiento/mantenimiento';
import { VehiculoComponent } from './components/Secretaria/vehiculo/vehiculo';
import { PreliquidacionComponent } from './components/Secretaria/preliquidacion/preliquidacion';
import { ServicioComponent } from './components/Secretaria/servicio/servicio';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'mantenimiento',component:MantenimientoComponent},
    {path:'vehiculo',component:VehiculoComponent},
    {path:'preliquidacion',component:PreliquidacionComponent},
    {path:'servicio',component:ServicioComponent},
 
    {path:'**',redirectTo:''}
];

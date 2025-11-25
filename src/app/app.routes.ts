import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento';
import { VehiculoComponent } from './components/vehiculo/vehiculo';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'mantenimiento',component:MantenimientoComponent},
    {path:'vehiculo',component:VehiculoComponent},
    {path:'**',redirectTo:''}
];

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Sidebar } from '../../sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-preliquidacion',
  imports: [Sidebar, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './preliquidacion.html',
  styleUrl: './preliquidacion.css',
})
export class PreliquidacionComponent {
  }
import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-confirm-dialog',
  template: `
    <div class="p-6 rounded-lg shadow-lg bg-[#faf4d3] text-[#0c1618] w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">¿Estás seguro?</h2>
      <p class="mb-6">Esta acción no se puede deshacer.</p>
      <div class="flex justify-end gap-3">
        <button
          (click)="dialogRef.close(false)"
          class="px-4 py-2 rounded bg-[#004643] text-[#faf4d3] hover:bg-[#003835] transition"
        >
          Cancelar
        </button>
        <button
          (click)="dialogRef.close(true)"
          class="px-4 py-2 rounded bg-[#d1ac00] text-white hover:bg-yellow-600 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: DialogRef<boolean>) {}
}

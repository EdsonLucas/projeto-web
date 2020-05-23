import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {
  constructor(private readonly toastr: ToastrService) {}

  success(titulo: string, texto: string): void {
    this.toastr.success(texto, titulo);
  }

  info(titulo: string, texto: string): void {
    this.toastr.info(texto, titulo);
  }

  warning(titulo: string, texto: string): void {
    this.toastr.warning(texto, titulo);
  }

  error(titulo: string, texto: string): void {
    this.toastr.error(texto, titulo);
  }

  customizada(titulo: string, texto: string, options: IndividualConfig): void {
    this.toastr.show(texto, titulo, options);
  }
}

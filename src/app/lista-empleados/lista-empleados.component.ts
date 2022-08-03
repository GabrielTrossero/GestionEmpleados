import { Component, OnInit } from '@angular/core';
import { Empleado } from '../models/empleado.model';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  arrEmpleados: Empleado[];

  constructor(private empleadosService:EmpleadosService) { }

  ngOnInit(): void {
    this.empleadosService.getAll()
      .then(empleados => {
        this.arrEmpleados = empleados;
      });
  }

  async onChange($event) {
    if ($event.target.value === 'todos') {
      this.ngOnInit();
    }
    else {
      this.arrEmpleados = await this.empleadosService.getForDepartamento($event.target.value);
    }
  }

}

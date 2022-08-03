import { Injectable } from '@angular/core';
import { Empleado } from './models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  arrEmpleados: Empleado[];

  constructor() { 
    this.arrEmpleados = [];
  }

  create(newEmp: Empleado): void {
    this.arrEmpleados.push(newEmp);
    console.log(this.arrEmpleados);
  }

  getAll(): Promise<Empleado[]> {
    return new Promise((resolve, reject) => {
      resolve(this.arrEmpleados);
    });
  }

  getForDepartamento($tipoDepto: string): Promise<Empleado[]> {
    return new Promise((resolve, reject) => {
      const arrTemp = this.arrEmpleados.filter(empleado => {
        console.log($tipoDepto);
        console.log(empleado.departamento);
        return ($tipoDepto === empleado.departamento);
      });
      resolve(arrTemp);
    });
  }
}

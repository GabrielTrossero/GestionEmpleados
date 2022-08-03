import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formEmpleado: FormGroup;

  constructor(private empleadosService: EmpleadosService) { 
    this.formEmpleado = this.newFormulario();
  }

  newFormulario(): FormGroup {
    return new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/),
      ]),
      edad: new FormControl('', [
        this.edadValidator,
      ]),
      departamento: new FormControl(''),
      password: new FormControl(''),
      imagen: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.empleadosService.create(this.formEmpleado.value);
    this.formEmpleado = this.newFormulario();
  }

  edadValidator(FormControl){
    const value = FormControl.value;
    
    const min = 18;
    const max = 65;

    if(value >= min && value <=max){
      return null;
    }
    else{
      return {edadValidator: {max, min}};
    }
  }

}

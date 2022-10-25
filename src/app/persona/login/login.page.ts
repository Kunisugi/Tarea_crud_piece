import { Component, OnInit } from '@angular/core';
import { PersonaConId } from '../modelo/persona';
import {LoginServiceService } from './../servicio/login-service.service';
import { FormBuilder,FormGroup , FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public listaPersonas: Array<PersonaConId> = [];
  public persona: PersonaConId;
  public formulario: FormGroup;

  constructor( private API: LoginServiceService, private formBuilder: FormBuilder,
    private router : Router) { this.crearFormulario();}

  public crearFormulario(){
    this.formulario = this.formBuilder.group({
      nombre: new FormControl (''),
      contraseña: new FormControl ('')

    })
  }
  ngOnInit() {
    this.API.listarPersona$.subscribe(datos => {
      this.listaPersonas = datos;
    })

    this.API.getPersonas();

  }

  public login(){
    this.persona = this.listaPersonas.find(elemento => {
      const user = this.formulario.value.nombre
      return elemento.user === user
    })
    if(this.persona){
      if(this.persona.password== this.formulario.value.contraseña){
        console.log('excelente puede pasar');
        localStorage.setItem("persona", JSON.stringify(this.persona));
        this.router.navigate(['home'])
      }else{
        alert('Contraseña erronea, porfavor vuelva a intentar')
      }
    }
    else {
      alert('No se encontro usuario')
      localStorage.clear()
    }





  }

}

import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from './../servicio/login-service.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public formulario: FormGroup;


  constructor( private API : LoginServiceService, private formBuilder: FormBuilder,
    private router : Router) { this.crearFormulario();}

  ngOnInit() {
  }
  public crearFormulario(){this.formulario = this.formBuilder.group({
    user: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\ ]+$/)]),
    password: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(3)])

  })

  }
  public register(){
    this.API.postPersona({
      ...this.formulario.value
    }).subscribe(data =>{
      this.router.navigate(['']).then(() => {
        window.location.reload();
      })

    })
  };
}

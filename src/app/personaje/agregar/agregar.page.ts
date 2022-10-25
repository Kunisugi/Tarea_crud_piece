import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiOnePieceService } from './../servicio/api-one-piece.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  public formulario :FormGroup;
  public imagenBase64 = '';

  constructor( private formBuilder: FormBuilder, private API: ApiOnePieceService, private router: Router ) {
    this.crearFormulario();
  }
  public crearFormulario(){   this.formulario = this.formBuilder.group({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ .]+$/)]),
    tripulacion: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.minLength(3), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]),
    edad: new FormControl('', [Validators.required, Validators.min(1), Validators.max(200)]),
    rol: new FormControl('', [Validators.required, , Validators.maxLength(20), Validators.minLength(3), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]+$/)]),
    img: new FormControl('', [Validators.required]),
    recompensa: new FormControl('', [Validators.required, Validators.pattern(/^[0-9.$ ]+$/)]),
  })}

  ngOnInit() {}

  public leerArchivo(evento : Event){
    const archivo = (evento.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload= () => {
      this.imagenBase64 = reader.result as string;
    }
  }
  public guardarDatos(){
    this.API.postPersonaje({
      ...this.formulario.value,
      img: this.imagenBase64
    }).subscribe(data => {
      this.router.navigate(['/home']).then(() =>{
        window.location.reload();
      });
      alert('Agregado correctamente')
    })
  }

}

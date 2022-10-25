import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiOnePieceService } from './../servicio/api-one-piece.service';
import { Personaje } from './../modelo/personaje';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  public formulario :FormGroup;
  public imagenBase64 = '';
  public id : number;
  public personaje : Personaje;

  constructor(  private formBuilder: FormBuilder, private activeRouter: ActivatedRoute, private API: ApiOnePieceService, private router : Router) {this.crearFormulario(); }

  public crearFormulario(){this.formulario = this.formBuilder.group({
    nombrePersonaje: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ .]+$/)]),
    tripulacion: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.minLength(3), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]),
    edad: new FormControl('', [Validators.required, Validators.min(1), Validators.max(200)]),
    rol: new FormControl('', [Validators.required, , Validators.maxLength(20), Validators.minLength(3), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]+$/)]),
    img: new FormControl('', [Validators.required]),
    recompensa: new FormControl('', [Validators.required, Validators.pattern(/^[0-9.$ ]+$/)]),
  })}

  ngOnInit( ) {
    this.id = this.activeRouter.snapshot.queryParams['id'];
    console.log(this.id)
    this.API.getPersonaje(this.id).subscribe(data => {
      this.personaje = data;
      this.formulario.setValue({
        'nombrePersonaje' : this.personaje.nombre,
        'tripulacion' : this.personaje.tripulacion,
        'edad' : this.personaje.edad,
        'rol' : this.personaje.rol,
        'img' : this.personaje.img,
        'recompensa' : this.personaje.recompensa,
      })
    })
  }
  public leerArchivo(evento : Event){
    const archivo = (evento.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload= () => {
      this.imagenBase64 = reader.result as string;
    }}
  public enviar(enviar){
    const update = {
      nombre : enviar.nombrePersonaje,
      tripulacion : enviar.tripulacion,
      edad : enviar.edad,
      rol : enviar.rol,
      img: this.imagenBase64,
      recompensa: enviar.recompensa,
    };
    this.API.patchPersonaje(update, this.id).subscribe(personaje => {
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      })
      console.log(personaje);
      alert("Personaje modificado correctamente");
    })


  }
  eliminarPersonaje():void{
    this.API.deletePersonaje(this.id).subscribe(() =>
    alert('eliminado :('));
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    })


  }
}



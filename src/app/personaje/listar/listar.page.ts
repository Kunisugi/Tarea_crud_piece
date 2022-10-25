import { Component, OnInit } from '@angular/core';
import { PersonajeConID } from '../modelo/personaje';
import { ApiOnePieceService } from './../servicio/api-one-piece.service';
import { PersonaConId } from './../../../app/persona/modelo/persona';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  public listaPersonajes: Array<PersonajeConID> = [];
  public persona: PersonaConId;


  constructor(private API :ApiOnePieceService, private router: Router
    ) {}

  ngOnInit() {
    this.API.listarPersonajes$.subscribe(datos => {
      this.listaPersonajes = datos;
      console.log(this.listaPersonajes, 'Hola soy lista Personajes')
    })
    this.API.listarPrimerosPersonajes();

    this.persona = JSON.parse(localStorage.getItem("persona"));
  }
  public cargarMasDatos(){
    this.API.obtenerMasPersonajes();
  }
  public logout(){
    localStorage.clear();
    this.router.navigate([''])
  }




}

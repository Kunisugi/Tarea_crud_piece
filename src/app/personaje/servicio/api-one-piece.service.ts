import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Personaje, PersonajeConID } from './../modelo/personaje';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ApiOnePieceService {

  private API_PIECE_URL = 'http://localhost:3000/personaje/';
  private paginaActual = 1;
  private comportamientoListar = new BehaviorSubject<Array<PersonajeConID>>([]);
  public listarPersonajes$ = this.comportamientoListar.asObservable();

  constructor( private http : HttpClient) { }

  public postPersonaje(nuevoPersonaje: Personaje): Observable<any>{
    return this.http.post(this.API_PIECE_URL, nuevoPersonaje, {
      headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
    })
  }

  public listarPrimerosPersonajes(){
    this.http.get<Array<PersonajeConID>>(`${this.API_PIECE_URL}?_page=1&_limit=10`).subscribe(data => {
      this.paginaActual = this.paginaActual + 1;
      this.comportamientoListar.next(data);
      console.log(data, 'Estoy en service')

    })
  }
  public obtenerMasPersonajes(){
    this.http.get<Array<PersonajeConID>>(`${this.API_PIECE_URL}?_page=${this.paginaActual}&_limit=10`).subscribe(
      data => {
        if(data){
          this.paginaActual = this.paginaActual + 1;
          this.comportamientoListar.next(this.comportamientoListar.getValue().concat(data));
          console.log(this.comportamientoListar , 'Que es comportamiento listar')
        }
      }
    )
  }
  public getPersonaje(id):Observable<Personaje>{
    let direccion = this.API_PIECE_URL + id;
    return this.http.get<Personaje>(direccion);
  }

  patchPersonaje(personaje, id){
    let direccion = this.API_PIECE_URL + id;
    return this.http.patch(direccion, personaje);
  }
  deletePersonaje(id){
    let direccion = this.API_PIECE_URL + id;
    return this.http.delete(direccion);
  }
}

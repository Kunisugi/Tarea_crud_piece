import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonaConId, Persona } from '../modelo/persona';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private API_PERSONA = 'http://localhost:3000/persona';
  private comportamientoListar = new BehaviorSubject<Array<PersonaConId>>([]);
  public listarPersona$ = this.comportamientoListar.asObservable();

  constructor(private http : HttpClient) { }
  public postPersona(nuevaPersona: Persona): Observable <any>{
    return this.http.post(this.API_PERSONA, nuevaPersona, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

  }


  public getPersonas(){
    this.http.get<Array<PersonaConId>>(this.API_PERSONA).subscribe(data => {
      this.comportamientoListar.next(data);
    })
  }




}

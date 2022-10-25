export interface Personaje {
  nombre : string;
  tripulacion: string;
  edad: number;
  rol: string;
  img: string;
  recompensa: string;
}

export interface PersonajeConID extends Personaje {
  id: number;
}
export interface PersonajeParcial extends Partial<Personaje>{

}

export interface IUsuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

export class CUsuario {
  nombre: string;
  email: string;
  password: string;

  constructor() {
    this.nombre = '';
    this.email = '';
    this.password = '';
  }
}
export interface ICurso {
  id: number;
  nombre: string;
}

export class CCurso {
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

export interface ICursoUsuario {
  id: number;
  nombre: string;
  cursoUsuario: ICurso[];
}

/*export interface ICurso {
  id: number;
  usuarioId: number;
}

*/

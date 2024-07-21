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
  usuarioId: number;
}

export interface ICursoUsuario {
  id: number;
  nombre: string;
  cursoUsuario: ICurso[];
}

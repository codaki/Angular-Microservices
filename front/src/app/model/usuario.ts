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

export interface ICursoCompleto {
  id: number;
  nombre: string;
  cursoUsuarios: ICursoUsuario[];
}

export interface ICursoUsuario {
  id: number;
  usuarioId: number;
}

export class CCursoCompleto {
  id: number;
  nombre: string;
  cursoUsuario: ICursoUsuario[];

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.cursoUsuario = [];
  }
}

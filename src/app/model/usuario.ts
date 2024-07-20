export interface IUsuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
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

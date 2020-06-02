export interface Cont004p {
  getcont004: Cont004;
  Delcont004: Cont004Del;
}

interface Cont004 {
  id_tipo_cuenta: number;
  id_cuenta: number;
  id_cuenta_adicional: number;
  descripcion: string;
  sigla: string;
  estado: boolean;
}

interface Cont004Del {
  id_tipocuenta: string;
  id_cuenta: string;
}

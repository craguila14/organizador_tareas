import { List } from '../lists/list.model';

export interface Board {
    id: string;
    titulo: string;
    descripcion?: string;
    listas?: List[];
  }
  
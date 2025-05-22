import { Card } from '../cards/card.model';

export interface List {
  id: string;
  titulo: string;
  posicion: number;
  boardId: string;
  cards?: Card[];
}

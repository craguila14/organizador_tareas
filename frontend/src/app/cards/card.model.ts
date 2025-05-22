export interface Card {
    id: string;
    titulo: string;
    posicion: number;   
    listId: string;
    estado: 'completa' | 'incompleta'; 
  }
  
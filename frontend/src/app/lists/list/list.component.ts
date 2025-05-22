import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'src/app/cards/card.model';
import { List } from '../list.model';
import { CardService } from 'src/app/cards/card.service';
import { FormsModule } from '@angular/forms';
import { ListService } from '../list.service'
import { DragDropModule, CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  @Input() list!: { id: string; titulo: string; posicion: number }
  @Input() connectedDropListsIds: string[] = [];

  cards: Card[] = [];
  nuevaCard = '';
  editandoLista = false;
  nuevoTituloLista = '';

  editandoCardId: string | null = null;
  titulosEditados: { [cardId: string]: string } = {};

  @Output() listaEliminada = new EventEmitter<string>();


  constructor(
    private cardService: CardService,
    private listService: ListService,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardService.getCardsByListId(this.list.id).subscribe({
      next: (cards) => (this.cards = cards),
      error: (err) => console.error('Error cargando tarjetas:', err)
    });
  }

   iniciarEdicionCard(card: Card): void {
    this.editandoCardId = card.id;
    this.titulosEditados[card.id] = card.titulo;
  }

  guardarTituloCard(card: Card): void {
    const nuevoTitulo = this.titulosEditados[card.id]?.trim();
    if (!nuevoTitulo) return;

    this.cardService.updateCard(card.id, {
      titulo: nuevoTitulo,
      posicion: card.posicion,
      listId: this.list.id,
      estado: card.estado
    }).subscribe({
      next: (updatedCard) => {
        card.titulo = updatedCard.titulo;
        this.editandoCardId = null;
      },
      error: (err) => console.error('Error editando tarjeta:', err)
    });
  }

   cancelarEdicionCard(): void {
    this.editandoCardId = null;
  }

  addCard(): void {
    if (!this.list?.id ||!this.nuevaCard.trim()) return;
  
    const cardData = {
      titulo: this.nuevaCard, 
      posicion: this.cards.length,
      estado: 'incompleta',
    };
  
    this.cardService.createCard(this.list.id, cardData).subscribe({
      next: (card) => {
        this.cards.push(card);
        this.nuevaCard = '';
      },
      error: (err) => console.error('Error creando tarjeta:', err)
    });
  }


  eliminarCard(card: Card): void {
     
      this.cardService.deleteCard(card.id).subscribe({
        next: () => {
          this.cards = this.cards.filter(c => c.id !== card.id);
        },
        error: (err) => console.error('Error eliminando tarjeta:', err)
      });
    
  }

  dropCard(event: CdkDragDrop<Card[]>) {
  if (event.previousContainer === event.container) {
    
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    this.cards.forEach((card, index) => {
      if (card.posicion !== index) {
        card.posicion = index;
        this.cardService.updateCard(card.id, {
          titulo: card.titulo,
          posicion: card.posicion,
          listId: this.list.id,
          estado: card.estado
        }).subscribe({
          error: (err) => console.error('Error reordenando tarjeta:', err)
        });
      }
    });
  } else {

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const movedCard = event.container.data[event.currentIndex];
    movedCard.listId = this.list.id;
    movedCard.posicion = event.currentIndex;

    this.cardService.updateCard(movedCard.id, {
      titulo: movedCard.titulo,
      posicion: movedCard.posicion,
      listId: this.list.id,
      estado: movedCard.estado
    }).subscribe({
      error: (err) => console.error('Error moviendo tarjeta entre listas:', err)
    });
  }
}

  iniciarEdicionLista(): void {
    this.editandoLista = true;
    this.nuevoTituloLista = this.list.titulo;
  }
  
  
  guardarTituloLista(): void {
    if (!this.list?.id || !this.nuevoTituloLista.trim()) return;
  
    const updatedListData = {
      titulo: this.nuevoTituloLista.trim(),
      posicion: this.list.posicion 
    };
  
    this.listService.updateList(this.list.id, updatedListData).subscribe({
      next: (updatedList) => {
        this.list.titulo = updatedList.titulo;
        this.list.posicion = updatedList.posicion; 
        this.editandoLista = false;
      },
      error: (err) => console.error('Error actualizando título de la lista:', err)
    });
  }


  
  eliminarLista(): void {
  const dialogRef = this.dialog.open<boolean>(ConfirmDialogComponent);

  dialogRef.closed.subscribe(result => {
    if (result) {
      this.listService.deleteList(this.list.id).subscribe({
        next: () => {
          this.listaEliminada.emit(this.list.id);
        },
        error: (err) => console.error('Error eliminando lista:', err)
      });
    }
  });
}

  
  toggleEstado(card: Card): void {
    const nuevoEstado = card.estado === 'completa' ? 'incompleta' : 'completa';
  
    this.cardService.updateCard(card.id, { 
      titulo: card.titulo, 
      posicion: card.posicion, 
      listId: this.list.id, 
      estado: nuevoEstado 
    }).subscribe({
      next: () => {
        card.estado = nuevoEstado; 
      },
      error: (err) => console.error('Error actualizando estado de tarjeta:', err)
    });
  }
  
}

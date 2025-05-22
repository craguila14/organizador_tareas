import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../board.service';
import { Board } from '../board.model';
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog.component';
import { ListService } from 'src/app/lists/list.service';
import { ListComponent } from 'src/app/lists/list/list.component';
import { List } from 'src/app/lists/list.model';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ListComponent, DragDropModule],
  templateUrl: './board-view.component.html',
})
export class BoardViewComponent implements OnInit {
  board: Board | null = null;
  nuevaListaTitulo: string = '';
  editandoTitulo = false;
  nuevoTituloTablero: string = '';
  connectedDropListsIds: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private dialog: Dialog,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    const boardId = this.route.snapshot.paramMap.get('id');
    if (boardId) {
      this.boardService.getBoardById(boardId).subscribe({
        next: (board) => {
          this.board = { ...board, listas: [] };
          this.nuevoTituloTablero = board.titulo;
          this.loadLists(boardId);
        },
        error: (err) => console.error('Error cargando tablero:', err)
      });
    }
  }

  guardarTituloTablero(): void {
    if (!this.board?.id || !this.nuevoTituloTablero.trim()) return;

    this.boardService.updateBoard(this.board.id, { titulo: this.nuevoTituloTablero.trim() }).subscribe({
      next: (updatedBoard) => {
        this.board!.titulo = updatedBoard.titulo;
        this.editandoTitulo = false;
      },
      error: (err) => console.error('Error actualizando título del tablero:', err)
    });
  }

  eliminarTablero(): void {
    const dialogRef = this.dialog.open<boolean>(ConfirmDialogComponent);

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.boardService.deleteBoard(this.board!.id).subscribe({
          next: () => this.router.navigate(['/tableros']),
          error: (err) => console.error('Error eliminando tablero:', err)
        });
      }
    });
  }

 loadLists(boardId: string): void {
  this.listService.getListsByBoardId(boardId).subscribe({
    next: (listas: List[]) => {
      this.board!.listas = listas.sort((a, b) => a.posicion - b.posicion);
      this.connectedDropListsIds = listas.map(lista => lista.id);
    },
    error: (err) => console.error('Error cargando listas:', err)
  });
}


  crearLista(): void {
    if (!this.board?.id || !this.nuevaListaTitulo.trim()) return;

    const nueva = {
      titulo: this.nuevaListaTitulo,
      posicion: this.board.listas?.length || 0
    };

    this.listService.createList(this.board.id, nueva).subscribe({
      next: (lista) => {
        if (!this.board!.listas) {
          this.board!.listas = [];
        }
        this.board!.listas.push(lista);
        this.nuevaListaTitulo = '';
      },
      error: (err) => console.error('Error creando lista:', err)
    });
  }

  quitarLista(listaId: string): void {
    if (this.board?.listas) {
      this.board.listas = this.board.listas.filter(l => l.id !== listaId);
    }
  }

  reordenarListas(event: CdkDragDrop<List[] | undefined>): void {
  const listas = this.board?.listas;
  if (!listas) return;

  moveItemInArray(listas, event.previousIndex, event.currentIndex);

  listas.forEach((lista, index) => {
    if (lista.posicion !== index) {
      lista.posicion = index;
      this.listService.updateList(lista.id, {
        titulo: lista.titulo,
        posicion: lista.posicion
      }).subscribe({
        error: (err) => console.error('Error actualizando posición de lista:', err)
      });
    }
  });
}
}

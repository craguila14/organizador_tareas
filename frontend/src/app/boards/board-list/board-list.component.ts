import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BoardService } from '../board.service';
import { Board } from '../board.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board-list.component.html',
})
export class BoardListComponent implements OnInit {
  boards: Board[] = [];
  newBoardName: string = '';

  constructor(private boardService: BoardService, private router: Router) {}

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards() {
    this.boardService.getBoards().subscribe({
      next: (boards) => (this.boards = boards),
      error: (err) => console.error('Error loading boards', err)
    });
  }

  createBoard() {
    if (!this.newBoardName.trim()) return;
  
    const boardData = {
      titulo: this.newBoardName,
      descripcion: 'Descripción del tablero'
    };
  
    this.boardService.createBoard(boardData).subscribe({
      next: (board) => {
        this.boards.push(board);
        this.newBoardName = '';
      },
      error: (err) => console.error('Error creating board', err)
    });
  }

  goToBoard(board: Board) {
    this.router.navigate(['/tableros', board.id]);
  }

  
}

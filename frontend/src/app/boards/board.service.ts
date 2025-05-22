import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from './board.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BoardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/boards`;
  getBoards(): Observable<Board[]> {
    return this.http.get<{ id: string; titulo: string }[]>(this.apiUrl).pipe(
      map((boards) =>
        boards.map((board) => ({
          id: board.id,
          titulo: board.titulo,
        }))
      )
    );
  }

  getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${id}`);
  }

  createBoard(data: { titulo: string; descripcion?: string }): Observable<Board> {
    return this.http.post<Board>(this.apiUrl, data);
  }

  updateBoard(id: string, data: Partial<Board>): Observable<Board> {
    return this.http.put<Board>(`${this.apiUrl}/${id}`, data);
  }

  deleteBoard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

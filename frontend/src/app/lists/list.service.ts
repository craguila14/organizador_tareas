import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from './list.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ListService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  getListsByBoardId(boardId: string): Observable<List[]> {
    return this.http.get<List[]>(`${this.apiUrl}/boards/${boardId}/lists`);
  }


  createList(boardId: string, data: { titulo: string; posicion: number }): Observable<List> {
    return this.http.post<List>(`${this.apiUrl}/boards/${boardId}/lists`, data);
  }
  


updateList(id: string, data: Partial<List>): Observable<List> {
  return this.http.put<List>(`${this.apiUrl}/lists/${id}`, data);
}


 
  deleteList(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/lists/${id}`);
  }
}

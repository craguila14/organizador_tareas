import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './card.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  getCardsByListId(listId: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/lists/${listId}/cards`);
  }

  createCard(listId: string, cardData: { titulo: string; posicion: number; estado: string; }): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/lists/${listId}/cards`, cardData);
  }

  updateCard(cardId: string, cardData: { titulo?: string; posicion?: number; listId?: string; estado?: string }): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/cards/${cardId}`, cardData);
  }

  deleteCard(cardId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cards/${cardId}`);
  }
}

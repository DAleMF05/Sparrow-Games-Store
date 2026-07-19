import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../game-list/Game';

@Injectable({ providedIn: 'root' })
export class GameService {
  private apiUrl = 'https://6a5cc7c00ad09982aef685fa.mockapi.io/api/games';

  constructor(private http: HttpClient) {}

  getGames(page: number, limit: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  addGame(game: Omit<Game, 'id'>): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }
}

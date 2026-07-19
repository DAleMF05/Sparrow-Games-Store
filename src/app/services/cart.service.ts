import { Injectable } from '@angular/core';
import { Game } from '../game-list/Game';

@Injectable({ providedIn: 'root' })
export class CartService {
  private games: Game[] = [];

  addGame(game: Game): void {
    this.games.push(game);
  }

  removeGame(gameId: number): void {
    this.games = this.games.filter((g) => g.id !== gameId);
  }

  getGames(): Game[] {
    return this.games;
  }

  getTotal(): number {
    return this.games.reduce((total, game) => total + game.price, 0);
  }

  isInCart(gameId: number): boolean {
    return this.games.some((g) => g.id === gameId);
  }
}

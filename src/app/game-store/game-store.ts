import { Component } from '@angular/core';
import { GameList } from '../game-list/game-list';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-game-store',
  imports: [GameList, Cart],
  templateUrl: './game-store.html',
  styleUrl: './game-store.scss',
})
export class GameStore {}

import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  constructor(private cartService: CartService) {}

  get games() {
    return this.cartService.getGames();
  }

  get total() {
    return this.cartService.getTotal();
  }

  get count() {
    return this.games.length;
  }

  removeGame(gameId: number): void {
    this.cartService.removeGame(gameId);
  }
}

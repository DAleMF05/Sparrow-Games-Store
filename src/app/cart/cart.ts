import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';

declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements AfterViewInit {
  @ViewChild('confirmModal') modalRef!: ElementRef;
  private modal: any;

  constructor(private cartService: CartService) {}

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(this.modalRef.nativeElement);
  }

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

  comprar(): void {
    this.modal.show();
  }

  confirmarCompra(): void {
    this.cartService.clear();
    this.modal.hide();
  }
}

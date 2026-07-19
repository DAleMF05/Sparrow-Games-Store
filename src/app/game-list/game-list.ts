import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Game } from './Game';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-list',
  imports: [CurrencyPipe],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export class GameList implements OnInit, OnDestroy {

  public manualGames: Game[] = [
    { id: 1, name: 'The Legend of Zelda: Tears of the Kingdom', price: 7000, genre: 'Aventura', image: 'https://img.asmedia.epimg.net/resizer/v2/UN7EWUQBDJCKXFY347M7APJBRI.jpg?auth=9bbf5b605601f98a161d810fa4a40fe3f7761a39e82b96fa31147b7c2a837e7a&width=1472&height=828&smart=true' },
    { id: 2, name: 'God of War Ragnarök', price: 6500, genre: 'Acción', image: 'https://static.wikia.nocookie.net/godofwar/images/c/ca/Portada_God_of_War_Ragnarok.png/revision/latest?cb=20211008000423&path-prefix=es' },
    { id: 3, name: 'EA Sports FC 25', price: 5000, genre: 'Deportes', image: 'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000074799/ab3989c5c208683e007deb3327a1ce70a8fa6cb38b06cfb8c2c80d563b19cfc7' },
    { id: 4, name: 'Red Dead Redemption 2', price: 4500, genre: 'Acción', image: 'https://store-images.s-microsoft.com/image/apps.34695.68182501197884443.ac728a87-7bc1-4a0d-8bc6-0712072da93c.25816f86-f27c-4ade-ae29-222661145f1f' },
    { id: 5, name: 'Minecraft', price: 3000, genre: 'Sandbox', image: 'https://store-images.s-microsoft.com/image/apps.17382.13510798885735219.9735d495-578c-4a4c-b892-3eb3a780b3a0.d3792486-cf98-40c0-a2c1-d6443f0e2b70' },
    { id: 6, name: 'Elden Ring', price: 6000, genre: 'RPG', image: 'https://www.nintendo.com/eu/media/images/assets/nintendo_switch_2_games/eldenringtarnishededition/2x1_NSwitch2_EldenRing.jpg' },
  ];

  public apiGames: Game[] = [];
  public currentPage = 1;
  public hasMorePages = true;
  private subscription: Subscription | null = null;

  constructor(
    private cartService: CartService,
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadApiGames(1);
  }

  loadApiGames(page: number): void {
    this.subscription?.unsubscribe();
    this.subscription = this.gameService.getGames(page, 6).subscribe((games) => {
      this.apiGames = games;
      this.hasMorePages = games.length === 6;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  refreshApiGames(): void {
    const page = this.currentPage > 1 ? this.currentPage - 1 : 1;
    this.loadApiGames(page);
  }

  nextPage(): void {
    this.currentPage++;
    this.loadApiGames(this.currentPage - 1);
  }

  prevPage(): void {
    this.currentPage--;
    if (this.currentPage > 1) {
      this.loadApiGames(this.currentPage - 1);
    }
  }

  isInCart(gameId: number): boolean {
    return this.cartService.isInCart(gameId);
  }

  toggleCart(game: Game): void {
    if (this.cartService.isInCart(game.id)) {
      this.cartService.removeGame(game.id);
    } else {
      this.cartService.addGame(game);
    }
  }
}

import { Routes } from '@angular/router';
import { GameStore } from './game-store/game-store';
import { AddGame } from './add-game/add-game';
import { About } from './about/about';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game-store',
    pathMatch: 'full',
  },
  {
    path: 'game-store',
    component: GameStore,
  },
  {
    path: 'add-game',
    component: AddGame,
  },
  {
    path: 'about',
    component: About,
  },
];

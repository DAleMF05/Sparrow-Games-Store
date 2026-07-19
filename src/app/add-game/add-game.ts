import { Component } from '@angular/core';
import { GameForm } from '../game-form/game-form';

@Component({
  selector: 'app-add-game',
  imports: [GameForm],
  templateUrl: './add-game.html',
  styleUrl: './add-game.scss',
})
export class AddGame {}

import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from '../game-list/Game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-form',
  imports: [ReactiveFormsModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.scss',
})
export class GameForm {
  @Output() gameAdded = new EventEmitter<void>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    genre: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  constructor(private gameService: GameService) {}

  onSubmit(): void {
    if (this.form.valid) {
      const game = this.form.value as Omit<Game, 'id'>;
      this.gameService.addGame(game).subscribe(() => {
        this.gameAdded.emit();
        this.form.reset();
      });
    }
  }
}

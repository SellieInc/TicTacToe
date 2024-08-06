// menu.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isOpen: boolean = false;

  constructor(
    private gameStateService: GameStateService,
    private router: Router
  ) {}

  openDialog() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  selectOption(option: string) {
    const isBotMode = option === 'pva';
    this.gameStateService.isBotMode = isBotMode;
    this.close();
    this.router.navigate(['/game']); // Navigate to board component
  }
}

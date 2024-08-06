import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private _isBotMode: boolean = false;
  private _isBotTurn: boolean = false;

  get isBotMode(): boolean {
    return this._isBotMode;
  }

  set isBotMode(value: boolean) {
    this._isBotMode = value;
  }

  get isBotTurn(): boolean {
    return this._isBotTurn;
  }

  set isBotTurn(value: boolean) {
    this._isBotTurn = value;
  }
}

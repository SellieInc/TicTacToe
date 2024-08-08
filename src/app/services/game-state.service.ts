import { Injectable } from '@angular/core';
import { CellEnum } from '../components/block/CellEnum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private _isBotMode: boolean = false;
  private _isBotTurn: boolean = false;
  private xWinsSubject = new BehaviorSubject<number>(0);
  private oWinsSubject = new BehaviorSubject<number>(0);

  xWins$ = this.xWinsSubject.asObservable();
  oWins$ = this.oWinsSubject.asObservable();

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

  incWins(player:string) {
    if (player === CellEnum.X) {
      const newCount = this.xWinsSubject.getValue() + 1;
      this.xWinsSubject.next(newCount);
    } else {
      const newCount = this.oWinsSubject.getValue() + 1;
      this.oWinsSubject.next(newCount);
    }
  }
}

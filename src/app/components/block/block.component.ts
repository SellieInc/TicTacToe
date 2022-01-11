import { Component, Input, OnInit } from '@angular/core';
import { CellEnum } from './CellEnum';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  @Input() public piece: CellEnum = CellEnum.EMPTY;
  @Input() public row!: number;
  @Input() public col!: number;
  constructor() { }

  ngOnInit(): void {
  }

}

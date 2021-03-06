import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Selection } from 'src/app/types/selection';
import { IClickedStockPile } from 'src/app/interfaces/event-data';
import { Card, Suits } from 'src/app/types/card';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  @Input() selection: Selection;
  @Output() componentCardClicked = new EventEmitter<IClickedStockPile>();

  constructor() { }

  ngOnInit() {
    this.selection.highlightGUI = this.highlightCard;
   }

  selectionClicked(card: Card) {
    if(card.isUpSided) {
      this.notify(card, false);
    }
  }

  selectionDblClicked(card: Card) {
    if(card.isUpSided) {
      this.notify(card, true);
    }
  }

  notify(card: Card, _wasDblClicked: boolean) {
    this.componentCardClicked.emit({ 
      card: card,
      stockPile: this.selection,
      wasDblClicked: _wasDblClicked
    });
  }

  highlightCard(card: Card, isHighlighted: boolean) {
    if(card) {
      let cardElement = document.getElementById(card.toString());
      cardElement.style.border = isHighlighted ? 'solid 2px blue' : '';
    }
  }
}

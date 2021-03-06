import { Card, Suits, Ranks } from './card';
import { IStockable } from '../interfaces/stock-piles'

export class Selection implements IStockable {
    
    public stock: Card[];
    public peek: Card;
    public highlightGUI: Function;

    constructor() {
        this.stock = [];
    }

    push(cards: Card[]): boolean {
        if(cards && cards.length === 1 && !cards[0].isUpSided) {
            if(this.stock.length > 0) {
                this.highlight(this.select()[0], false);
            }

            let newCard = cards[0];
            newCard.isUpSided = true;
            this.stock.push(newCard);
            return true;
        }
        return false;
    }    
    
    pop(card?: Card) {
        if(this.stock.length > 0) this.stock.pop();
        else
            throw new Error('the selection stock pile is empty');
    }

    select(): Card[] {
        if(this.stock.length > 0) return [this.stock[this.stock.length - 1]];
        else
            throw new Error('the selection stock pile is empty');       
    }

    highlight(card: Card, isHighlighted: boolean) {
        if(card) {
            this.highlightGUI(card, isHighlighted);
        }
    }
}
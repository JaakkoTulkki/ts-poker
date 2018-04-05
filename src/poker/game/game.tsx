import { Card, Deck } from '../deck/deck';
import { Validator, PokerValidator } from './validator';

export class Hand {
    constructor(private cards: Card[]) {
    }

    getCards(): Card[] {
        return this.cards;
    }
}

export class Poker {
    private deck: Deck;
    private hand: Hand;
    private hasSwapped = false;

    constructor(private validator: Validator = new PokerValidator()) {
        this.deck = new Deck();
        this.deck.shuffle();
        this.makeInitialHand();
    }

    deal() {
        if (this.hasSwapped) {
            throw new Error('You can only change your cards once');
        }

        let newCards: Card[] = [];
        for (let card of this.hand.getCards()) {
            if (card.shouldFold()) {
                let newCard: Card|undefined = this.deck.getCards().shift();
                if (!newCard) {
                    throw new Error('You ran out of cards');
                }
                newCards.push(newCard);
            } else {
                newCards.push(card);
            }
        }
        this.hand = new Hand(newCards);
        this.hasSwapped = true;
    }

    getHand(): Hand {
        return this.hand;
    }

    evaluateHand(): string {
        return this.validator.getBest(this.hand);
    }

    private makeInitialHand() {
        this.hand = new Hand(this.deck.getCards().splice(0, 5));
    }
}
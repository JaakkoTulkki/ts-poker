export class Card {
    private _fold = false;
    constructor(public suite: string, public value: number) {}
    toString() {
        return `${this.suite}-${this.value}`;
    }

    shouldFold() {
        return this._fold;
    }

    fold() {
        this._fold = true;
    }
}

export class Deck {
    readonly SUITES = 'D-C-H-S';
    private cards: Card[];

    constructor() {
        this.cards = this.createDeck();
    }

    getSuites(): string[] {
        return this.SUITES.split('-');
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    getCards(): Card[] {
        return this.cards;
    }

    private createDeck() {
        const deck: Card[] = [];
        this.getSuites().forEach((suite: string) => {
            for (let i = 1; i < 14; i++) {
                deck.push(new Card(suite, i));
            }
        });
        return deck;
    }
}

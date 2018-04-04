import { Deck, Card } from './deck';

test('expect deck to have a length of 52', () => {
    const deck = new Deck();
    expect(deck.getCards().length).toEqual(52);

});

test('expect deck to have four suites', () => {
    const deck = new Deck();
    const expectedSuites = deck.getSuites();
    const actualSuites = Array.from(new Set(deck.getCards().map((card: Card) => card.suite)));
    expect(actualSuites).toEqual(expectedSuites);
});

test('expect each suite to have values from 1-13', () => {
    const deck = new Deck();
    const cards: string[] = deck.getCards().map(card => card.toString());

    for (let suite of deck.getSuites()) {
        for (let i = 1; i < 14; i++) {
            expect(cards.indexOf(new Card(suite, i).toString())).toBeGreaterThan(-1);
        }
    }
});

test('suites returns correct suites', () => {
    const deck = new Deck();
    expect(deck.getSuites()).toEqual(['D', 'C', 'H', 'S']);
});

test('you cannot fiddle with suites', () => {
    const deck = new Deck();
    deck.getSuites().push('4434');
    expect(deck.getSuites().length).toEqual(4);
});

test('deck shuffles', () => {
    const deck = new Deck();
    const originalOrder = deck.getCards().map(card => card.toString());
    deck.shuffle();
    deck.shuffle();
    expect(deck.getCards().map(card => card.toString())).not.toEqual(originalOrder);
});

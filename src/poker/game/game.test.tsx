import { Poker } from './game';
import {
    HIGH_CARD,
    PAIR,
    THREE_OF_KIND,
    STRAIGHT,
    FLUSH,
    FULL_HOUSE,
    FOUR_OF_KIND,
    ROYAL_FLUSH,
} from './validator';

test('it should first give a hand of five cards', () => {
    const poker = new Poker();
    const hand = poker.getHand();
    expect(hand.getCards().length).toBe(5);
});

test('When dealt a hand, and if nothing swapped, then the hand should stay the same', () => {
    const poker = new Poker();
    const originalCards = poker.getHand().getCards().slice();
    poker.deal();
    const newCards = poker.getHand().getCards();
    expect(newCards).toEqual(originalCards);
});

test('When dealt hand, and when swapped cards, should be dealt new cards', () => {
    const poker = new Poker();
    const originalCards = poker.getHand().getCards().slice();
    originalCards[0].fold();
    originalCards[1].fold();
    poker.deal();
    const newCards = poker.getHand().getCards();
    expect(newCards).not.toEqual(originalCards);
    expect(newCards.length).toBe(5);
});

test('should not let swap cards more than once', () => {
    const poker = new Poker();
    const originalCards = poker.getHand().getCards().slice();
    originalCards[0].fold();
    poker.deal();
    expect(() => poker.deal()).toThrow();
});

test.only('should validate hand', () => {
    const poker = new Poker();
    const originalCards = poker.getHand().getCards().slice();
    originalCards[0].fold();
    poker.deal();
    const result = poker.evaluateHand();
    const possibleResults = [HIGH_CARD,
        PAIR,
        THREE_OF_KIND,
        STRAIGHT,
        FLUSH,
        FULL_HOUSE,
        FOUR_OF_KIND,
        ROYAL_FLUSH, ];
    expect(possibleResults.indexOf(result) > -1 ).toBeTruthy();
});

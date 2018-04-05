import { Card } from '../deck/deck';
import { Hand } from './game';
import { PokerValidator } from './validator';
import {
    HIGH_CARD,
    PAIR,
    THREE_OF_KIND,
    TWO_PAIRS,
    STRAIGHT,
    FLUSH,
    FULL_HOUSE,
    FOUR_OF_KIND,
    ROYAL_FLUSH,
} from './validator';

function createHand(...cards: string[]): Hand {
    const _cards: Card[] = [];
    for (let card of cards) {
        let suite: string, value: string;
        [suite, value] = card.split('-');
        _cards.push(new Card(suite, Number.parseFloat(value)));
    }
    return new Hand(_cards);
}

function getBest(hand: Hand) {
    return new PokerValidator().getBest(hand);
}

test('it should validate a high card', () => {
    const hand = createHand('S-2', 'S-12', 'H-5', 'H-1', 'D-11');
    expect(getBest(hand)).toBe(HIGH_CARD);
});

test('it should validate a pair', () => {
    const hand = createHand('S-2', 'S-12', 'H-2', 'H-1', 'D-11');
    expect(getBest(hand)).toBe(PAIR);
});

test('it should validate three of kind', () => {
    const hand = createHand('S-2', 'S-12', 'H-2', 'H-1', 'D-2');
    expect(getBest(hand)).toBe(THREE_OF_KIND);
});

test('it should validate two pairs', () => {
    const hand = createHand('S-2', 'D-2', 'H-9', 'S-9', 'D-12');
    expect(getBest(hand)).toBe(TWO_PAIRS);
});

test('it should validate flush', () => {
    const hand = createHand('S-2', 'S-12', 'S-4', 'S-11', 'S-1');
    expect(getBest(hand)).toBe(FLUSH);
});

test('it should validate normal straight', () => {
    const hand = createHand('S-1', 'H-2', 'S-3', 'S-4', 'D-5');
    expect(getBest(hand)).toBe(STRAIGHT);
});

test('it should validate a royal straight', () => {
    const hand = createHand('S-10', 'S-11', 'H-12', 'D-13', 'S-1');
    expect(getBest(hand)).toBe(STRAIGHT);
});

test('it should validate a Full house', () => {
    const hand = createHand('S-10', 'H-10', 'D-10', 'C-1', 'S-1');
    expect(getBest(hand)).toBe(FULL_HOUSE);
});

test('it should validate four of kind', () => {
    const hand = createHand('S-10', 'H-10', 'D-10', 'C-10', 'S-1');
    expect(getBest(hand)).toBe(FOUR_OF_KIND);
});

test('it should validate royal flush', () => {
    const hand = createHand('S-10', 'S-11', 'S-12', 'S-13', 'S-1');
    expect(getBest(hand)).toBe(ROYAL_FLUSH);
});

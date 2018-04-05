import { Hand } from './game';
import { Card } from '../deck/deck';

export const HIGH_CARD = 'HIGH_CARD';
export const PAIR = 'PAIR';
export const TWO_PAIRS = 'TWO_PAIRS';
export const THREE_OF_KIND = 'THREE_OF_KIND';
export const STRAIGHT = 'STRAIGHT';
export const FLUSH = 'FLUSH';
export const FULL_HOUSE = 'FULL_HOUSE';
export const FOUR_OF_KIND = 'FOUR_OF_KIND';
export const ROYAL_FLUSH = 'ROYAL_FLUSH';

export interface Validator {
    getBest(hand: Hand): string;
}

export class PokerValidator implements Validator {
    getBest(hand: Hand): string {
        const cards = hand.getCards();
        const self = this;
        const order = [
            [this.isRoyalFlush.bind(self), ROYAL_FLUSH],
            [this.isFourOfKind.bind(self), FOUR_OF_KIND],
            [this.isFullHouse.bind(self), FULL_HOUSE],
            [this.isFlush.bind(self), FLUSH],
            [this.isStraight.bind(self), STRAIGHT],
            [this.isThreeOfKind.bind(self), THREE_OF_KIND],
            [this.isTwoPairs.bind(self), TWO_PAIRS],
            [this.isPair.bind(self), PAIR],
        ];
        for (let validationPair of order) {
            let [validator, returnValue] = validationPair;
            if (typeof validator === 'function' && typeof returnValue === 'string' && validator(cards)) {
                return returnValue;
            }
        }
        return HIGH_CARD;
    }

    private isPair(cards: Card[]): boolean {
        const values = this.getUniqueValues(cards);
        return values.size === 4;
    }

    private isTwoPairs(cards: Card[]): boolean {
        const values = cards.map((card) => card.value);
        const uniqueValues = this.countNumbers(values);
        let numberOfPairs = 0;
        Object.keys(uniqueValues).forEach(key => {
            if (uniqueValues[key] === 2) {
                numberOfPairs += 1;
            }
        });
        return numberOfPairs === 2;
    }

    private isThreeOfKind(cards: Card[]): boolean {
        const values = cards.map((card) => card.value);
        const uniqueValues = this.countNumbers(values);
        let found = false;
        Object.keys(uniqueValues).forEach(key => {
            if (uniqueValues[key] === 3) {
                found = true;
            }
        });
        return found;
    }

    private isFlush(cards: Card[]): boolean {
        const suites = this.getUniqueSuites(cards);
        return suites.size === 1;
    }

    private isStraight(cards: Card[]): boolean {
        const uniqueValues = Array.from(this.getUniqueValues(cards));
        if (uniqueValues.length !== 5) {
            return false;
        }
        let highestValue = Math.max(...uniqueValues);
        let lowestValue = Math.min(...uniqueValues);

        if ((highestValue - lowestValue) === 4) {
            return true;
        }
        if (lowestValue === 1) {
            const valuesWithoutAce = uniqueValues.filter(value => value !== 1);
            highestValue = Math.max(...valuesWithoutAce);
            lowestValue = Math.min(...valuesWithoutAce);
            if ((highestValue - lowestValue) === 3) {
                return true;
            }
        }
        return false;
    }

    private isFourOfKind(cards: Card[]) {
        const values = cards.map(card => card.value);
        if (new Set(values).size !== 2) {
            return false;
        }
        const valuesCounter = this.countNumbers(values);
        return Object.keys(valuesCounter).every(key => {
            const counter = valuesCounter[key];
            return counter === 1 || counter === 4;
        });
    }

    private isFullHouse(cards: Card[]): boolean {
        const values = cards.map(card => card.value);
        const valuesCounter = this.countNumbers(values);
        if (Object.keys(valuesCounter).length !== 2) {
            return false;
        }
        return Object.keys(valuesCounter).every(key => {
            const counter = valuesCounter[key];
            return counter === 2 || counter === 3;
        });
    }

    private countNumbers(values: number[]) {
        return values.reduce((acc, value) => {
            if (!acc[value]) {
                acc[value] = 1;
            } else {
                acc[value] += 1;
            }
            return acc;
        },                   {});
    }

    private isRoyalFlush(cards: Card[]) {
        return this.isFlush(cards) && this.isStraight(cards);
    }

    private getUniqueValues(cards: Card[]): Set<number> {
        const values = new Set();
        for (let card of cards) {
            values.add(card.value);
        }
        return values;
    }

    private getUniqueSuites(cards: Card[]): Set<string> {
        const suites = new Set();
        for (let card of cards) {
            suites.add(card.suite);
        }
        return suites;
    }
}
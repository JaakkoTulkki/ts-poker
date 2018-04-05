import * as React from 'react';
import { Hand, Poker } from '../../poker/game/game';
import { Card as CardDeck } from '../../poker/deck/deck';

interface CardProps {
    card: CardDeck;
}

interface CardState {
    swap: boolean;
}

export class Card extends React.Component<CardProps, CardState> {
    constructor(props: CardProps) {
        super(props);
        props.card.fold(); // card is folded by default
        this.state = {
            swap: props.card.shouldFold()
        };
        this.select = this.select.bind(this);
    }

    select() {
        this.setState((state, props) => {
            props.card.fold();
            return {
                swap: props.card.shouldFold()
            };
        });
    }

    render() {
        return (
            <div
                className="card"
                data-card-value={this.props.card.toString()}
                data-selected={this.state.swap}
                onClick={this.select}
            >
                {this.props.card.toString()} {this.state.swap ? 'push to keep' : 'push to swap'}
            </div>);
    }
}

export class Game extends React.Component<{}, {hand: Hand, poker: Poker, hasDrawn: boolean}> {
    constructor(props: object) {
        super(props);
        const poker = new Poker();
        const hand: Hand = poker.getHand();
        this.state = {
            poker,
            hand,
            hasDrawn: false,
        };
        this.deal = this.deal.bind(this);
    }

    deal() {
        this.setState((state, props) => {
            this.state.poker.deal();
            return {
                hand: this.state.poker.getHand(),
                hasDrawn: true,
            };
        });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.hand.getCards().map((card: CardDeck) => (
                        <Card key={card.toString()} card={card}/>))}
                </div>
                {!this.state.hasDrawn &&
                    <button id="deal" onClick={this.deal}>Deal New Cards</button>
                }
                {this.state.hasDrawn &&
                    <div id="result">Your hand is {this.state.poker.evaluateHand()}</div>
                }
            </div>
        );
    }
}

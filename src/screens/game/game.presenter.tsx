import * as React from 'react';
import { Hand, Poker } from '../../poker/game/game';
import { Card as CardDeck } from '../../poker/deck/deck';

interface CardProps {
    card: CardDeck;
}

interface CardState {
    swap: boolean;
}

interface CardValueProps {
    suite: string;
    value: number;
}

const cardValues = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K',
};

export const CardValue: React.SFC<CardValueProps> = (props) => (
    <div className="card-value">
        <img src={`/Card_${props.suite}.svg`} />
        <div className="card-value--value">
            {cardValues[props.value] ? cardValues[props.value] : props.value}
        </div>
    </div>
);

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
            <div className={`card`}>
                <div
                    className={`card__elem ${!this.state.swap ? 'keep' : ''}`}
                    data-card-value={this.props.card.toString()}
                    data-selected={this.state.swap}
                    onClick={this.select}
                    data-test-id="card"
                >
                    <CardValue value={this.props.card.value} suite={this.props.card.suite} />
                </div>
                {`${!this.state.swap ? 'Keep' : 'Swap'}`}
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
        this.restartGame = this.restartGame.bind(this);
    }

    restartGame() {
        const poker = new Poker();
        const hand: Hand = poker.getHand();
        this.setState(() => ({
            poker,
            hand,
            hasDrawn: false,
        }));
    }

    deal() {
        this.setState((state, props) => {
            state.poker.deal();
            return {
                hand: state.poker.getHand(),
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
                    <div>
                        <div id="result">Your hand is {this.state.poker.evaluateHand()}</div>
                        <button id="new-cards" onClick={this.restartGame}>Start Again</button>
                    </div>
                }
            </div>
        );
    }
}

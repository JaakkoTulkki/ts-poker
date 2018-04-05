import * as React from 'react';
import { mount } from 'enzyme';
import { Game, Card } from './game.presenter';

test('it should render five cards', () => {
    const expectedNumOfCards = 5;
    const wrapper = mount(<Game />);
    const actualLength = wrapper.find(Card).length;
    expect(actualLength).toEqual(expectedNumOfCards);
});

test('each card should be different', () => {
    const expectedNumOfValues = 5;
    const wrapper = mount(<Game />);
    const cards = new Set(wrapper.find('.card').map(component => component.props()['data-card-value']));
    expect(cards.size).toBe(expectedNumOfValues);
});

test('clicking cards should toggle them (select/unselect)', () => {
    const wrapper = mount(<Game />);
    let firstCard = wrapper.find('.card').at(1);
    let thirdCard = wrapper.find('.card').at(3);

    expect(firstCard.props()['data-selected']).toBe(true);
    expect(thirdCard.props()['data-selected']).toBe(true);

    firstCard.simulate('click');
    thirdCard.simulate('click');

    firstCard = wrapper.find('.card').at(1);
    thirdCard = wrapper.find('.card').at(3);
    expect(firstCard.props()['data-selected']).toBe(false);
    expect(thirdCard.props()['data-selected']).toBe(false);
});

test('clicking two cards and then swapping should keep the two selected cards', () => {
    const wrapper = mount(<Game />);
    const originalCardValues = wrapper.find('.card').map((component) => component.props()['data-card-value']);
    const firstCard = wrapper.find('.card').at(1);
    const thirdCard = wrapper.find('.card').at(3);
    const unSelectedCard = wrapper.find('.card').at(4);
    firstCard.simulate('click');
    thirdCard.simulate('click');

    wrapper.find('button #deal').simulate('click');

    const newCardValues = wrapper.find('.card').map((component) => component.props()['data-card-value']);
    expect(newCardValues).not.toEqual(originalCardValues);
    expect(newCardValues.indexOf(firstCard.props()['data-card-value']) > -1).toBeTruthy();
    expect(newCardValues.indexOf(thirdCard.props()['data-card-value']) > -1).toBeTruthy();
    expect(newCardValues.indexOf(unSelectedCard.props()['data-card-value']) > -1).toBe(false);
});

test('you should not be able to draw twice', () => {
    const wrapper = mount(<Game />);
    wrapper.find('button #deal').simulate('click');
    expect(wrapper.find('button #deal').length).toBe(0);
});

test('Selecting two cards and drawing should show the best score', () => {
    const wrapper = mount(<Game />);
    wrapper.find('.card').at(1).simulate('click');
    wrapper.find('.card').at(3).simulate('click');
    wrapper.find('button #deal').simulate('click');

    const infoText = 'Your hand is ';
    const actualText = wrapper.find('#result').text();
    expect(actualText.startsWith(infoText)).toBeTruthy();
    expect(actualText.length).toBeGreaterThan(infoText.length);
});

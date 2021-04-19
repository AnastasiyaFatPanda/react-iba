import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const { Provider, Consumer } = React.createContext();

class CardsContextProvider extends React.Component {
    constructor(props) {
        super(props);
        const cards = [
            {
                id: uuidv4(),
                title: 'First Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: uuidv4(),
                title: 'Second Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: uuidv4(),
                title: 'Third Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: uuidv4(),
                title: 'Fourth Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: uuidv4(),
                title: 'Fifth Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: uuidv4(),
                title: 'Sixth Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: uuidv4(),
                title: 'Seventh Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: uuidv4(),
                title: 'Eighth Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: uuidv4(),
                title: 'Ninth Card',
                descr: 'Description',
                selected: false,
            },
        ];
        this.state = {
            viewOnly: false,
            cards,
            isDisabled: true,
            countCards: cards.length
        };
    }

    onViewOnlyChanged = () => {
        const { viewOnly } = this.state;
        this.setState({ viewOnly: !viewOnly });
    };

    onDelete = () => {
        this.setState(prevState => ({
            cards: prevState.cards.filter(card => !card.selected),
            isDisabled: true,
            countCards: prevState.cards.filter(card => !card.selected).length,
        }));
    };

    onCreate = () => {
        this.setState(prevState => ({
            cards: prevState.cards.concat([
                {
                    id: uuidv4(),
                    title: 'New Card',
                    descr: 'Description',
                    selected: false,
                },
            ]),
            countCards: prevState.countCards + 1
        }));
    };

    onSelect = ({ id, selected }) => {
        this.setState(prevState => {
            const newCards = prevState.cards.map(card =>
                card.id === id ? { ...card, selected } : card
            );
            return {
                cards: newCards,
                isDisabled: !newCards.some(card => card.selected),
            };
        });
    };

    render() {
        const { children } = this.props;
        return <Provider
            value={{
                ...this.state,
                onViewOnlyChanged: this.onViewOnlyChanged,
                onDelete: this.onDelete,
                onCreate: this.onCreate,
                onSelect: this.onSelect,
            }}>
            {children}
        </Provider>;
    }
}

CardsContextProvider.propTypes = {
    children: PropTypes.array,
};

export { CardsContextProvider, Consumer as CardsContextConsumer };
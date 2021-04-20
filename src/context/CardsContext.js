import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const { Provider, Consumer } = React.createContext();

class CardsContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOnly: false,
            cards: [],
            isDisabled: true,
            countCards: 0
        };
    }

    componentDidMount() {
        const url = 'https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json';
        axios.get(url).then((response) => {
            const cards = response.data.slice(0, 15)
                .map((card) => ({
                    id: uuidv4(),
                    title: card.Name,
                    descr: card.About,
                    selected: false
                }));
            this.setState({ cards, countCards: cards.length })
        });
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
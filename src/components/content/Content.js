import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import CardList from './cardList';
import './Content.scss';

const ViewOnlyCheckbox = styled.div`
    margin-left: 3rem;
    color: ${props => (props.inputSelected ? 'LightSteelBlue' : 'LightGray')};

    &:hover {
        color: ${props => (props.inputSelected ? 'CornflowerBlue' : 'Black')};
    }
`;

class Content extends React.Component {
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
        }));
    };

    onCreate = () => {
        this.setState(prevState => ({
            cards: prevState.cards.concat([{
                id: uuidv4(),
                title: 'New Card',
                descr: 'Description',
                selected: false,
            }]),
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
        const { viewOnly, cards, isDisabled } = this.state;
        return (
            <div className="content">
                <div className="row">
                    <ViewOnlyCheckbox inputSelected={viewOnly}>
                        <input
                            id="viewOnlyCheckbox"
                            className="form-check-input"
                            value={viewOnly}
                            type="checkbox"
                            onClick={this.onViewOnlyChanged}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="viewOnlyCheckbox"
                        >
                            View only
                        </label>
                    </ViewOnlyCheckbox>
                    <button
                        className="btn btn-dark"
                        type="button"
                        disabled={isDisabled}
                        onClick={this.onDelete}
                    >
                        Delete selected
                    </button>
                    <button
                        className="btn btn-dark"
                        type="button"
                        onClick={this.onCreate}
                    >
                        Create a new card
                    </button>
                </div>
                <div className="row">
                    <CardList
                        cards={cards}
                        viewOnly={viewOnly}
                        onSelect={this.onSelect}
                    />
                </div>
            </div>
        );
    }
}

export default Content;

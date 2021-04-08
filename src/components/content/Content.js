import React from 'react';
import styled from 'styled-components';
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
                id: 1,
                title: 'First Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: 2,
                title: 'Second Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: 3,
                title: 'Third Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: 4,
                title: 'Fourth Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: 5,
                title: 'Fifth Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: 6,
                title: 'Sixth Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: 7,
                title: 'Seventh Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: 8,
                title: 'Eighth Card',
                descr: 'Description',
                selected: false,
            },
            {
                id: 9,
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

    onSelect = ({ id, selected }) => {
        this.setState(prevState => ({
            cards: prevState.cards.map(card =>
                card.id === id ? { ...card, selected } : card
            ),
            isDisabled: !prevState.cards
                .map(card => (card.id === id ? { ...card, selected } : card))
                .some(card => card.selected),
        }));
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

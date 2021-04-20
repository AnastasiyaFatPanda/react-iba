import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';

const CardList = ({ onSelect, viewOnly, cards }) =>
    cards.length > 0
        ? cards.map(card => (
            <Card
                title={card.title}
                descr={card.descr}
                key={card.id}
                id={card.id}
                viewOnly={viewOnly}
                isSelected={card.selected}
                onSelect={onSelect}
            />
        ))
        : <div>Loading cards...</div>;

CardList.propTypes = {
    viewOnly: PropTypes.bool,
    cards: PropTypes.array,
    onSelect: PropTypes.func,
};

export default CardList;

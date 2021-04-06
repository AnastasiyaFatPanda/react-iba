import React from 'react';
import PropTypes from 'prop-types';
import Card from './card/Card';

const CardList = props => {
    const { onSelect, viewOnly, cards } = props;
    return (
        <>
            {cards.map(card => (
                <Card
                    title={card.title}
                    descr={card.descr}
                    key={card.id}
                    id={card.id}
                    viewOnly={viewOnly}
                    isSelected={card.selected}
                    onSelect={onSelect}
                />
            ))}
        </>
    );
};

CardList.propTypes = {
    viewOnly: PropTypes.bool,
    cards: PropTypes.array,
    onSelect: PropTypes.func,
};

export default CardList;

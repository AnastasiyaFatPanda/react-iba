import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import WithLoadingDelay from '../../hoc/WithLoadingDelay';

const CardList = ({ onSelect, viewOnly, cards }) =>
    cards.map(card => (
        <WithLoadingDelay key={card.id}>
            <Card
                title={card.title}
                descr={card.descr}
                key={card.id}
                id={card.id}
                viewOnly={viewOnly}
                isSelected={card.selected}
                onSelect={onSelect}
            />
        </WithLoadingDelay>
    ));

CardList.propTypes = {
    viewOnly: PropTypes.bool,
    cards: PropTypes.array,
    onSelect: PropTypes.func,
};

export default CardList;

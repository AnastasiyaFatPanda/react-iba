import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './card';

const CardList = ({ viewOnly, cards }) => {
    const history = useHistory();

    return cards.map(card => (
        <Card
            title={card.title}
            descr={card.descr}
            key={card.id}
            id={card.id}
            viewOnly={viewOnly}
            isSelected={card.selected}
            history={history}
        />
    ))
};

CardList.propTypes = {
    viewOnly: PropTypes.bool,
    cards: PropTypes.array,
};

const mapStateToProps = state => ({
    viewOnly: state.viewOnly,
    cards: state.cards,
});

export default connect(mapStateToProps, null)(CardList);

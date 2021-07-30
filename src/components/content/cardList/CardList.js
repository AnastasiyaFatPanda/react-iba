import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './card';

const CardList = ({ readOnly, cards }) => {
    const history = useHistory();

    return cards.map(card => (
        <Card
            title={card.title}
            descr={card.descr}
            key={card.id}
            id={card.id}
            viewOnly={readOnly}
            isSelected={card.selected}
            history={history}
        />
    ))
};

CardList.propTypes = {
    readOnly: PropTypes.bool,
    cards: PropTypes.array,
};

const mapStateToProps = state => ({
    readOnly: state.settingsReducer.readOnly,
    cards: state.cardReducer.cards,
});

export default connect(mapStateToProps, null)(CardList);

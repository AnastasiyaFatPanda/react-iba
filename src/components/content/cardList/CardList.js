import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './card';

const CardList = ({ readOnly, cards, isAdmin }) => {
    const history = useHistory();

    return cards.map(card => (
        <Card
            title={card.title}
            descr={card.descr}
            key={card.id}
            id={card.id}
            viewOnly={readOnly && !isAdmin}
            isSelected={card.selected}
            history={history}
        />
    ))
};

CardList.propTypes = {
    readOnly: PropTypes.bool,
    isAdmin: PropTypes.bool,
    cards: PropTypes.array,
};

const mapStateToProps = state => ({
    readOnly: state.settingsReducer.readOnly,
    isAdmin: state.authReducer.currentUser.isAdmin,
    cards: state.cardReducer.cards,
});

export default connect(mapStateToProps, null)(CardList);

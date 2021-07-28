import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardList from './cardList';
import './Content.scss';
import { deleteCard, createCard, fetchCards } from '../../redux/actions/cardActions';

class Content extends React.Component {
    componentDidMount() {
        const { cards, fetchCardsHandle } = this.props;
        if (cards.length === 0) {
            fetchCardsHandle();
        }
    }

    render() {
        const {
            isDisabled,
            deleteCardHandle,
            createCardHandle,
        } = this.props;
        return (
            <div className="content">
                <div className="row">
                    <button
                        className="btn btn-dark"
                        type="button"
                        disabled={isDisabled}
                        onClick={deleteCardHandle}
                    >
                        Delete selected
                    </button>
                    <button
                        className="btn btn-dark"
                        type="button"
                        onClick={createCardHandle}
                    >
                        Create a new card
                    </button>
                </div>
                <div className="row">
                    <CardList />
                </div>
            </div>
        )
    }
}

Content.propTypes = {
    isDisabled: PropTypes.bool,
    cards: PropTypes.array,
    deleteCardHandle: PropTypes.func,
    createCardHandle: PropTypes.func,
    fetchCardsHandle: PropTypes.func,
};
const mapStateToProps = state => ({
    isDisabled: state.cardReducer.isDisabled,
    cards: state.cardReducer.cards,
});

const mapDispatchToProps = {
    deleteCardHandle: deleteCard,
    createCardHandle: createCard,
    fetchCardsHandle: fetchCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
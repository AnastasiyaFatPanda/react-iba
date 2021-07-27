import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardList from './cardList';
import './Content.scss';
import { deleteCard, createCard, viewOnlyChange, fetchCards } from '../../redux/actions/actions';

const ViewOnlyCheckbox = styled.div`
    margin-left: 3rem;
    color: ${props => (props.inputSelected ? 'LightSteelBlue' : 'LightGray')};

    &:hover {
        color: ${props => (props.inputSelected ? 'CornflowerBlue' : 'Black')};
    }
`;

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
            viewOnly,
            deleteCardHandle,
            createCardHandle,
            viewOnlyChangeHandle
        } = this.props;
        return (
            <div className="content">
                <div className="row">
                    <ViewOnlyCheckbox inputSelected={viewOnly}>
                        <input
                            id="viewOnlyCheckbox"
                            className="form-check-input"
                            checked={viewOnly}
                            type="checkbox"
                            onChange={viewOnlyChangeHandle}
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
    viewOnly: PropTypes.bool,
    isDisabled: PropTypes.bool,
    cards: PropTypes.array,
    deleteCardHandle: PropTypes.func,
    createCardHandle: PropTypes.func,
    viewOnlyChangeHandle: PropTypes.func,
    fetchCardsHandle: PropTypes.func,
};
const mapStateToProps = state => ({
    viewOnly: state.viewOnly,
    isDisabled: state.isDisabled,
    cards: state.cards,
});

const mapDispatchToProps = {
    deleteCardHandle: deleteCard,
    createCardHandle: createCard,
    viewOnlyChangeHandle: viewOnlyChange,
    fetchCardsHandle: fetchCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
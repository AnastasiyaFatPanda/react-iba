import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CardInfo.scss';
import PropTypes from 'prop-types';
import { updateCard } from '../../../redux/actions/actions';

export class CardInfo extends Component {
    constructor(props) {
        super(props);
        const { cards } = this.props;
        const card = cards.some((element) => element.id === props.match.params.id)
            ? cards.find((element) => element.id === props.match.params.id)
            : null;


        this.state = {
            showErrorMessage: !cards.some((element) => element.id === props.match.params.id),
            title: card?.title,
            descr: card?.descr,
        };
    }

    saveData = () => {
        const { title, descr } = this.state;
        const { handleUpdateCard } = this.props;
        handleUpdateCard({
            id: this.props.match.params.id,
            title,
            descr,
        });

        this.goHome();
    };

    titleChangedHandler = event => {
        this.setState({
            title: event.target.value,
        });
    };

    descrChangedHandler = event => {
        this.setState({
            descr: event.target.value,
        });
    };

    goHome = () => {
        const { history } = this.props;
        history.push('/');
    }

    render() {
        const { title, descr, showErrorMessage } = this.state;

        return showErrorMessage
            ? (<h1> Such card does not exist </h1>)
            : (
                <div className="card-info-detail">
                    <h5>Title: </h5>
                    <br />
                    <textarea
                        className="form-control"
                        type="text"
                        onChange={this.titleChangedHandler}
                        defaultValue={title}
                    />
                    <br />
                    <h5>Description: </h5>
                    <textarea
                        className="form-control"
                        type="text"
                        onChange={this.descrChangedHandler}
                        defaultValue={descr}
                    />
                    <br />
                    <div className="row">
                        <button className="card-button" type="submit" onClick={this.saveData}>
                            Save
                        </button>
                        <button className="card-button" type="button" onClick={this.goHome}>
                            Cancel
                        </button>
                    </div>

                </div >
            );
    }
}

CardInfo.propTypes = {
    history: PropTypes.any,
    cards: PropTypes.array,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
    handleUpdateCard: PropTypes.func,
};

const mapStateToProps = state => ({ cards: state.cards });

const mapDispatchToProps = {
    handleUpdateCard: updateCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardInfo);
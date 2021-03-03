import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiXCircle, FiEdit } from 'react-icons/fi';

class Card extends React.Component {
  constructor(props) {
    super(props);
    const { title, decr } = this.props;
    this.state = {
      selectedCard: false,
      isEdited: false,
      title,
      decr,
    };

    this.title = React.createRef();
    this.decr = React.createRef();
  }

  handleCheckboxClick = () => {
    const { selectedCard } = this.state;
    this.setState({ selectedCard: !selectedCard });
  };

  onEdit = () => {
    this.setState({ isEdited: true, selectedCard: false });
  };

  onCancel = () => {
    this.setState({ isEdited: false, selectedCard: false });
  };

  onSubmit = () => {
    this.setState({
      isEdited: false,
      selectedCard: false,
      title: this.title.current.value,
      decr: this.decr.current.value,
    });
  };

  render() {
    const { selectedCard, isEdited, title, decr } = this.state;
    const className = selectedCard ? 'card selected' : 'card';

    return (
      <div className={className}>
        {isEdited ? (
          <div className="title row">
            <div className="col-9">
              <textarea
                ref={this.title}
                className="form-control textarea-title"
                type="text"
                defaultValue={title}
              />
            </div>
            <div className="col-1 actionButton">
              <FiXCircle className="fiXButton" onClick={this.onCancel} />
            </div>
            <div className="col-1 actionButton">
              <FiCheckCircle className="fiXButton" onClick={this.onSubmit} />
            </div>
          </div>
        ) : (
          <div className="title row">
            <div className="col-8 title-text" title={title}>
              {title}
            </div>
            <div className="col-1">
              <input type="checkbox" onClick={this.handleCheckboxClick} />
            </div>
            <div className="col-1 edit-button">
              <FiEdit onClick={this.onEdit} />
            </div>
          </div>
        )}
        {isEdited ? (
          <div className="card-body">
            <textarea
              ref={this.decr}
              className="form-control textarea"
              type="text"
              defaultValue={decr}
            />
          </div>
        ) : (
          <div className="card-body decr"> {decr} </div>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  decr: PropTypes.string,
};

export default Card;

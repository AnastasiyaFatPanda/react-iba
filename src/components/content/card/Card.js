import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiXCircle, FiEdit } from 'react-icons/fi';

class Card extends React.Component {
  constructor(props) {
    super(props);
    const { title, descr } = this.props;
    this.state = {
      selectedCard: false,
      isEdited: false,
      title,
      descr,
    };

    this.title = React.createRef();
    this.descr = React.createRef();
  }

  componentDidUpdate(nextProps) {
    const { viewOnly } = this.props;
    if (nextProps.viewOnly !== viewOnly) {
      this.stopEdit();
    }
  }

  stopEdit = () => {
    this.setState({ isEdited: false });
  };

  handleCheckboxClick = () => {
    const { selectedCard } = this.state;
    this.setState({ selectedCard: !selectedCard });
  };

  onEdit = () => {
    this.setState({ isEdited: true, selectedCard: false });
  };

  onCancel = () => {
    this.setState({ isEdited: false });
  };

  onSubmit = () => {
    this.setState({
      isEdited: false,
      selectedCard: false,
      title: this.title.current.value,
      descr: this.descr.current.value,
    });
  };

  renderEditable = () => {
    const { title, descr } = this.state;
    return (
      <>
        <div className="title row">
          <div className="col-8">
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
        <div className="card-body">
          <textarea
            ref={this.descr}
            className="form-control textarea"
            type="text"
            defaultValue={descr}
          />
        </div>
      </>
    );
  };

  renderNotEditable = () => {
    const { title, descr } = this.state;
    const { viewOnly } = this.props;
    return (
      <>
        <div className="title row">
          <div className="col-8 title-text" title={title}>
            {title}
          </div>
          <div className="col-1">
            <input type="checkbox" onClick={this.handleCheckboxClick} />
          </div>
          {!viewOnly && (
            <div className="col-1 edit-button">
              <FiEdit onClick={this.onEdit} />
            </div>
          )}
        </div>
        <div className="card-body descr"> {descr} </div>
      </>
    );
  };

  render() {
    const { selectedCard, isEdited } = this.state;
    const className = selectedCard ? 'card selected' : 'card';

    return (
      <div className={className}>
        {isEdited ? this.renderEditable() : this.renderNotEditable()}
      </div>
    );
  }
}

Card.propTypes = {
  viewOnly: PropTypes.bool,
  title: PropTypes.string,
  descr: PropTypes.string,
};

export default Card;

import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: false,
    };
  }

  handleCheckboxClick = () => {
    const { selectedCard } = this.state;
    this.setState({ selectedCard: !selectedCard });
  }

  render() {
    const { name, decr } = this.props;
    const { selectedCard } = this.state;
    const className = selectedCard ? 'card selected' : 'card';

    return (
      <div className={className}>
        <div className="title row">
          <div className="col-md-10">
            {name}
          </div>
          <div className="col-md-1">
            <input type="checkbox" onClick={this.handleCheckboxClick} />
          </div>
        </div>
        <div className="decr"> {decr} </div>
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string,
  decr: PropTypes.string,
};

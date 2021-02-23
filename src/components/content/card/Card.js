import React from "react";
import "./Card.scss";
import PropTypes from "prop-types";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: false,
    };
  }

  handleClick() {
    this.setState({ selectedCard: !this.state.selectedCard });
    console.log(this.state.selectedCard);
  }

  render() {
    const { name, decr } = this.props;
    const { selectedCard } = this.state;
    const className = selectedCard ? "card selected" : "card";
    console.log(className);
    return (
      <div className={className}>
        <div className="title">
          {name}
          <input type="checkbox" onClick={() => this.handleClick()}></input>
        </div>
        <div className="decr"> {decr} </div>
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string,
  decr: PropTypes.string,
  onClick: PropTypes.func,
};

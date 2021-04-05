import React from 'react';
import styled from 'styled-components';
import Card from './cardList/card';
import './Content.scss';

const ViewOnlyCheckbox = styled.div`
  margin-left: 3rem;
  color: ${props => props.inputSelected ? 'LightSteelBlue' : 'LightGray'};

  &:hover {
    color: ${props => props.inputSelected ? 'CornflowerBlue' : 'Black'};
  }
`

class Content extends React.Component {
  constructor(props) {
    super(props);
    const cards = [
      {
        id: 1,
        title: 'First Card',
        descr: 'Description',
        selected: false
      },
      {
        id: 2,
        title: 'Second Card',
        descr: 'Description',
        selected: false
      },
      {
        id: 3,
        title: 'Third Card',
        descr: 'Description',
        selected: false
      },
      {
        id: 4,
        title: 'Fourth Card',
        descr: 'Description',
        selected: false
      },
      {
        id: 5,
        title: 'Fifth Card',
        descr: 'Description',
        selected: false
      },
      {
        id: 6,
        title: 'Sixth Card',
        descr: 'Description',
        selected: false
      },
      {
        id: 7,
        title: 'Seventh Card',
        descr: 'Description',
        selected: false
      },
      {
        id: 8,
        title: 'Eighth Card',
        descr: 'Description',
        selected: false
      },
      {
        id: 9,
        title: 'Ninth Card',
        descr: 'Description',
        selected: false
      }
    ]
    this.state = {
      viewOnly: false,
      cards,
      isDisabled: true
    };
  }

  onViewOnlyChanged = () => {
    const { viewOnly } = this.state;
    this.setState({ viewOnly: !viewOnly });
  }

  onDelete = () => {
    const { cards } = this.state;
    const deleteCards = cards.filter(card => !card.selected);
    this.setState({ cards: deleteCards });
  }

  onSelect = ({ id, title, descr, selected }) => {
    const { cards } = this.state;
    const newCards = cards.map(card => card.id === id ? { id, title, descr, selected } : card);
    this.setState({
      cards: newCards,
      isDisabled: !newCards.some(card => card.selected)
    });
  }

  render() {
    const { viewOnly, cards, isDisabled } = this.state;
    return (
      <div className="content">
        <div className="row">
          <ViewOnlyCheckbox inputSelected={viewOnly}>
            <input id="viewOnlyCheckbox" className="form-check-input" value={viewOnly} type="checkbox" onClick={this.onViewOnlyChanged} />
            <label className="form-check-label" htmlFor="viewOnlyCheckbox">View only</label>
          </ViewOnlyCheckbox>
          <button
            className="btn btn-dark"
            type="button"
            disabled={isDisabled}
            onClick={this.onDelete}>
            Delete selected
            </button>
        </div>
        <div className="row">
          {cards.map(card => (
            <Card
              title={card.title}
              descr={card.descr}
              key={card.id}
              id={card.id}
              viewOnly={viewOnly}
              isSelected={card.selected}
              onSelect={this.onSelect} />
          ))}
        </div>
      </div>
    );
  }

}

export default Content;

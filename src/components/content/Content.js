import React from 'react';
import styled from 'styled-components';
import Card from './card';
import './Content.scss';

const ViewOnlyCheckbox = styled.div`
  margin: 2rem;
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
        descr: 'Descriptopn',
      },
      {
        id: 2,
        title: 'Second Card',
        descr: 'Descriptopn',
      },
      {
        id: 3,
        title: 'Third Card',
        descr: 'Descriptopn',
      },
      {
        id: 4,
        title: 'Fourth Card',
        descr: 'Descriptopn',
      },
      {
        id: 5,
        title: 'Fifth Card',
        descr: 'Descriptopn',
      },
      {
        id: 6,
        title: 'Sixth Card',
        descr: 'Descriptopn',
      },
      {
        id: 7,
        title: 'Seventh Card',
        descr: 'Descriptopn',
      },
      {
        id: 8,
        title: 'Eighth Card',
        descr: 'Descriptopn',
      },
      {
        id: 9,
        title: 'Ninth Card',
        descr: 'Descriptopn',
      }
    ]
    this.state = {
      viewOnly: false,
      cards,
    };
  }

  onViewOnlyChanged = () => {
    const { viewOnly } = this.state;
    this.setState({ viewOnly: !viewOnly });
  }

  render() {
    const { viewOnly, cards } = this.state;

    return (
      <div className="content">
        <ViewOnlyCheckbox className="row" inputSelected={viewOnly}>
          <input id="viewOnlyCheckbox" className="form-check-input" value={viewOnly} type="checkbox" onClick={this.onViewOnlyChanged} />
          <label className="form-check-label" htmlFor="viewOnlyCheckbox">View only</label>
        </ViewOnlyCheckbox>
        <div className="row">
          {cards.map(card => (<Card title={card.title} descr={card.descr} key={card.id} viewOnly={viewOnly} />))}
        </div>

      </div>
    );
  }

}

export default Content;

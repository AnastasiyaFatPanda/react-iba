import React from 'react';
import styled from 'styled-components';
import CardList from './cardList';
import './Content.scss';
import { CardsContextConsumer } from '../../context/CardsContext';

const ViewOnlyCheckbox = styled.div`
    margin-left: 3rem;
    color: ${props => (props.inputSelected ? 'LightSteelBlue' : 'LightGray')};

    &:hover {
        color: ${props => (props.inputSelected ? 'CornflowerBlue' : 'Black')};
    }
`;

const Content = () =>
(<CardsContextConsumer>
    {(context) => (
        <div className="content">
            <div className="row">
                <ViewOnlyCheckbox inputSelected={context.viewOnly}>
                    <input
                        id="viewOnlyCheckbox"
                        className="form-check-input"
                        value={context.viewOnly}
                        type="checkbox"
                        onClick={context.onViewOnlyChanged}
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
                    disabled={context.isDisabled}
                    onClick={context.onDelete}
                >
                    Delete selected
                    </button>
                <button
                    className="btn btn-dark"
                    type="button"
                    onClick={context.onCreate}
                >
                    Create a new card
                    </button>
            </div>
            <div className="row">
                <CardList
                    cards={context.cards}
                    viewOnly={context.viewOnly}
                    onSelect={context.onSelect}
                />
            </div>
        </div>
    )}
</CardsContextConsumer>);

export default Content;

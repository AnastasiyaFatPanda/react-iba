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
    {({ viewOnly, onViewOnlyChanged, isDisabled, onDelete, onCreate, cards, onSelect, onChange }) => (
        <div className="content">
            <div className="row">
                <ViewOnlyCheckbox inputSelected={viewOnly}>
                    <input
                        id="viewOnlyCheckbox"
                        className="form-check-input"
                        checked={viewOnly}
                        type="checkbox"
                        onChange={onViewOnlyChanged}
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
                    onClick={onDelete}
                >
                    Delete selected
                    </button>
                <button
                    className="btn btn-dark"
                    type="button"
                    onClick={onCreate}
                >
                    Create a new card
                    </button>
            </div>
            <div className="row">
                <CardList
                    cards={cards}
                    viewOnly={viewOnly}
                    onSelect={onSelect}
                    onChange={onChange}
                />
            </div>
        </div>
    )}
</CardsContextConsumer>);

export default Content;

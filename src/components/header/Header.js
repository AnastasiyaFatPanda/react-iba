import React from 'react';
import './Header.scss';
import logo from '../../logo.svg';
import { CardsContextConsumer } from '../../context/CardsContext';

const Header = () => (
    <CardsContextConsumer>
        {
            ({ countCards }) =>
            (<div className="header row">
                <div className="col-10">
                    <img src={logo} alt="Logo" />
                    <span className="header-title">
                        Learning React
                </span>
                </div>
                <div className="col-2 counter">
                    <span className="badge badge-light">
                        {countCards}
                    </span>
                </div>
            </div>)
        }
    </CardsContextConsumer>
);

export default Header;

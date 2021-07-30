import React, { useEffect } from 'react';
import './App.scss';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';
import Content from './components/content';
import LogIn from './components/login';
import Header from './components/header';
import NotFound from './components/notFound';
import CardInfo from './components/content/cardInfo';
import Settings from './components/settings/Settings';
import { AuthActions } from './redux/reducers/authReducer';


const App = ({ logInHandle }) => {
    useEffect(() => {
        if (localStorage.getItem('authData')) {
            logInHandle(JSON.parse(localStorage.getItem('authData')));
        }
    });

    const history = useHistory();
    const auth = useSelector(state => state.authReducer.isAuth);
    const isAdmin = useSelector(state => state.authReducer.currentUser.isAdmin);

    return (
        <div className="App">
            <Header />
            <Switch>
                {
                    auth
                        ? (<>
                            <Route path="/" exact component={Content} />
                            {isAdmin && <Route path="/settings" exact component={Settings} />}
                            <Route path="/card/:id" component={CardInfo} history={history} />
                        </>
                        )
                        : <Route path="/" exact> <LogIn /> </Route>
                }
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

App.propTypes = {
    logInHandle: PropTypes.func,
};

const mapDispatchToProps = {
    logInHandle: AuthActions.login,
};

export default connect(null, mapDispatchToProps)(App);

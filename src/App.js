import React, { useState } from 'react';
import './App.scss';
import { Switch, Route, useHistory } from 'react-router-dom';
import Content from './components/content';
import LogIn from './components/login';
import Header from './components/header';
import NotFound from './components/notFound';
import CardInfo from './components/content/cardInfo';

const App = () => {
    const [auth, setAuth] = useState(false);
    const history = useHistory();

    return (
        <div className="App">
            <Header />
            <Switch>
                {
                    auth
                        ? <Route path="/" exact component={Content} />
                        : <Route path="/" exact> <LogIn logIn={() => setAuth(true)} /> </Route>
                }
                <Route path="/login"> <LogIn logIn={() => setAuth(true)} /> </Route>
                <Route path="/card/:id" component={CardInfo} history={history} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;

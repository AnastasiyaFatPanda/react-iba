import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Content from './components/content';
import LogIn from './components/login';
import Header from './components/header';
import NotFound from './components/notFound';
import CardInfo from './components/content/cardInfo';
import store from './redux';

const App = () => {
    const [auth, setAuth] = useState(false);
    const history = useHistory();

    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={store}>
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
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;

import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Content from './components/content';
import LogIn from './components/login';
import Header from './components/header';
import { CardsContextProvider } from './context/CardsContext';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false
        }
    }

    logIn = () => this.setState({ auth: true })

    render() {
        const { auth } = this.state;

        return (
            <div className="App">
                <BrowserRouter>
                    <CardsContextProvider>
                        <Header />
                        <Switch>
                            {auth
                                ? <Route path="/" exact> <Content /> </Route>
                                : <Route path="/" exact> <LogIn logIn={() => this.logIn()} /> </Route>
                            }
                            <Route path="/login"  >
                                <LogIn />
                            </Route>                            
                            <Route render={() => <h1>404: Not found</h1>} />
                        </Switch>
                    </CardsContextProvider>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

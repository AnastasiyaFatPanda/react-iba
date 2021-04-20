import React from 'react';
import './App.scss';
import Content from './components/content';
import Header from './components/header';
import { CardsContextProvider } from './context/CardsContext';

function App() {
    return (
        <div className="App">
            <CardsContextProvider>
                <Header />
                <Content />
            </CardsContextProvider>
        </div>
    );
}

export default App;

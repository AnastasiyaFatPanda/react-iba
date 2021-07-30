import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
    CREATE_CARD,
    DELETE_CARD,
    UPDATE_CARD,
    SELECT_CARD,
    FETCH_CARD_START,
    FETCH_CARD_SUCCESS,
    FETCH_CARD_FAIL,
} from './types';

const URL = 'https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json';

export const createCard = () => ({ type: CREATE_CARD });
export const deleteCard = () => ({ type: DELETE_CARD });
export const selectCard = card => ({ type: SELECT_CARD, payload: card });
export const updateCard = newCard => ({ type: UPDATE_CARD, payload: newCard });
export const fetchCards = () => dispatch => {
    dispatch({
        type: FETCH_CARD_START
    });
    return axios.get(URL).then(
        response => {
            dispatch({
                type: FETCH_CARD_SUCCESS,
                payload: {
                    cards: response.data.slice(0, 15)
                        .map((card) => ({
                            id: uuidv4(),
                            title: card.Name,
                            descr: card.About,
                            selected: false
                        }))
                }
            })
        },
        error =>
            dispatch({
                type: FETCH_CARD_FAIL,
                payload: { error }
            })
    );
};

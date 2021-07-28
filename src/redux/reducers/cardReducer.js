import { v4 as uuidv4 } from 'uuid';
import {
    CREATE_CARD,
    DELETE_CARD,
    UPDATE_CARD,
    SELECT_CARD,
    FETCH_CARD_START,
    FETCH_CARD_SUCCESS,
    FETCH_CARD_FAIL,
    VIEW_ONLY,
} from '../actions/types';

const initialState = {
    cards: [],
    isDisabled: true,
    viewOnly: false,
    countCards: 0,
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CARD_START:
            return {
                ...state,
                fetching: true
            };
        case FETCH_CARD_SUCCESS:
            return {
                ...state,
                cards: action.payload.cards,
                countCards: action.payload.cards.length,
                fetching: false
            };
        case FETCH_CARD_FAIL:
            return {
                ...state,
                error: action.payload.error,
                fetching: false
            };
        case CREATE_CARD:
            return {
                ...state,
                cards: [
                    ...state.cards,
                    {
                        id: uuidv4(),
                        title: 'New Card',
                        descr: 'Description',
                        selected: false,
                    },
                ],
                countCards: state.countCards + 1
            };
        case DELETE_CARD: {
            const newCards = state.cards.filter(card => !card.selected);
            return {
                cards: newCards,
                isDisabled: true,
                countCards: newCards.length,
            };
        }
        case UPDATE_CARD:
            return {
                ...state,
                cards: state.cards.map(card =>
                    card.id === action.payload.id ? { ...card, ...action.payload } : card
                ),
            };
        case SELECT_CARD: {
            const newCards = state.cards.map(card =>
                card.id === action.payload.id ? { ...card, selected: action.payload.selected } : card
            );
            return {
                ...state,
                cards: newCards,
                isDisabled: !newCards.some(card => card.selected),
            };
        }
        case VIEW_ONLY:
            return {
                ...state,
                viewOnly: !state.viewOnly,
            };
        default:
            return state;
    }
};

export default cardReducer;
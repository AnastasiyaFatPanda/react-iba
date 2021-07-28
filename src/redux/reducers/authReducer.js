/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    admin: {
        username: 'testAdmin@gmail.com',
        password: '12345yuiopp',
    },
    currentUser: {
        authData: {
            username: null,
            password: null,
        },
        isAdmin: false,
    },
    isAuth: false,
};

const AuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, password } = action.payload;
            localStorage.setItem('authData', JSON.stringify(action.payload));
            state.isAuth = true;
            state.currentUser = {
                authData: {
                    username,
                    password,
                },
                isAdmin: state.admin.username === username && state.admin.password === password,
            };
        },
        logout: state => {
            localStorage.removeItem('authData');
            state.isAuth = false;
            state.currentUser = initialState.currentUser;
        },
    },
});

export const AuthActions = AuthReducer.actions;
export default AuthReducer.reducer;

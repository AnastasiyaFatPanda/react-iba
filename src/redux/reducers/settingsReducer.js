/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    readOnly: false,
};

const SettingsReducer = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggle: (state) => {
            state.readOnly = !state.readOnly 
        },
    },
});

export const SettingsActions = SettingsReducer.actions;
export default SettingsReducer.reducer;

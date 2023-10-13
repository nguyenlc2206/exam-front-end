// types

import { createSlice } from '@reduxjs/toolkit';

// project imports
import { MenuProps } from '@package:src/common/types/menu';

// initial state
const initialState: MenuProps = {
    selectedItem: ['default'],
    selectedID: null,
    drawerOpen: false,
    error: null
    // menu: {}
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.selectedItem = action.payload;
        },

        activeID(state, action) {
            state.selectedID = action.payload;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload;
        }
    }
});

export default menu.reducer;

export const { activeItem, openDrawer, activeID } = menu.actions;

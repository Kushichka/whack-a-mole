import { createSlice } from "@reduxjs/toolkit";

export const cellsReducer = createSlice({
    name: 'cells',
    initialState: {
        cells: []
    },
    reducers: {
        setCells: (state, action) => {
            state.cells = action.payload;
        }
    }
});

export const { setCells } = cellsReducer.actions;
export default cellsReducer.reducer;
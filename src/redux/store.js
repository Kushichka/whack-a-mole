import { configureStore } from "@reduxjs/toolkit"; 

import gameReducer from './reducers/gameReducer';
import cellsReducer from './reducers/cellsReducer';

export const store = configureStore({
    reducer: {
        gameReducer,
        cellsReducer
    }
});


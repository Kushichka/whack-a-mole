import { configureStore } from "@reduxjs/toolkit";

import game from './slices/gameSlice';
import { winnerMiddleware } from "./middlewares/winnerMiddleware";

export const store = configureStore({
    reducer: { game },
    middleware: [winnerMiddleware]
});


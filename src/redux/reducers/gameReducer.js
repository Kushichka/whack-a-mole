import { createSlice } from "@reduxjs/toolkit";

const gameReducer = createSlice({
    name: 'game',
    initialState: {
        gameStatus: false,
        winCell: null,
        level: {id: 1, timer: 1500},
        score: {player: 0, computer: 0}
    },
    reducers: {
        setGameStatus: (state) => {
            state.gameStatus = !state.gameStatus;
        },
        setWinCell: (state, action) => {
            state.winCell = action.payload;
        },
        setLevel: (state, action) => {
            state.level = {
                id: action.payload.id,
                timer: action.payload.timer
            }
        },
        setScore: (state, action) => {
            if(action.payload === 'player') {
                state.score.player += 1;
            }
            if(action.payload === 'computer') {
                state.score.computer += 1;
            }
        }
    }
})

export const { setGameStatus, setWinCell, setLevel, setScore } = gameReducer.actions;
export default gameReducer.reducer;
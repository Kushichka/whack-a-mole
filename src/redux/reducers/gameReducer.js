import { createSlice } from "@reduxjs/toolkit";

const gameReducer = createSlice({
    name: 'game',
    initialState: {
        gameStatus: false,
        winner: '',
        winCell: null,
        difficulty: {id: 0, timer: 1500},
        score: {player: 0, computer: 0}
    },
    reducers: {
        setGameStatus: (state) => {
            state.gameStatus = !state.gameStatus;
        },
        setWinCell: (state, action) => {
            state.winCell = action.payload;
        },
        setDifficulty: (state, action) => {
            state.difficulty = {
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

export const { setGameStatus, setWinCell, setDifficulty, setScore } = gameReducer.actions;
export default gameReducer.reducer;
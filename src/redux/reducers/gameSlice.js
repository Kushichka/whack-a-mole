import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameStatus: false,
    winner: '',
    winCell: null,
    difficulty: { id: 0, timer: 1500 },
    score: { player: 0, computer: 0 },
    usedCells: [22, 11],
    fieldSize: 10,
    roundEnd: null
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
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
        checkWinner: (state, action) => {
            if (action.payload.winner === 'computer') {
                state.score.computer += 1;
            } 
            
            if (action.payload.winner === 'player') {
                state.score.player += 1;
            }

            if (state.score.player >= (((state.fieldSize * state.fieldSize) / 2) + 1)) {
                state.winner = 'Player';
            }
            if (state.score.computer >= (((state.fieldSize * state.fieldSize) / 2) + 1)) {
                state.winner = 'Computer';
            }

            if (state.score.computer === 50 && state.score.player === 50) {
                state.winner = 'Nobody won, try again';
            }
        },
        setRoundEnd: (state, action) => {
            state.roundEnd = action.payload;
        },
        setUsedCells: (state, action) => {
            state.usedCells.push(action.payload);
        },
        resetStore: (state) => {
            state.winner = '';
            state.winCell = null;
            state.score = { player: 0, computer: 0 };
            state.usedCells = [];
            state.roundEnd = null;
        }
    }
})

export const {actions, reducer} = gameSlice;

export default reducer;
export const { 
    setGameStatus, setWinCell, setDifficulty, 
    checkWinner, setRoundEnd, resetStore,
    setUsedCells
} = actions;

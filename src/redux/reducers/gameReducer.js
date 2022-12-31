import { createSlice } from "@reduxjs/toolkit";

const gameReducer = createSlice({
    name: 'game',
    initialState: {
        gameStatus: false,
        winner: '',
        winCell: null,
        difficulty: {id: 0, timer: 1500},
        score: {player: 0, computer: 0},
        usedCells: [],
        roundEnd: false,
        isPlayerWin: false
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
        checkWinner: (state, action) => {
            state.usedCells.push(action.payload.winCell);

            if (action.payload.winner === 'computer') {
                state.score.computer += 1;
            } 
            
            if (action.payload.winner === 'player') {
                state.score.player += 1;
            }
        },
        setRoundEnd: (state, action) => {
            state.roundEnd = action.payload
        },
        setIsPlayerWin: (state, action) => {
            state.isPlayerWin = action.payload
        }
    }
})

export const { setGameStatus, setWinCell, setDifficulty, checkWinner, setRoundEnd, setIsPlayerWin } = gameReducer.actions;
export default gameReducer.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameStatus: false,
    winner: '',
    winCell: null,
    difficulty: { id: 0, timer: 1500 },
    score: { player: 0, computer: 0 },
    usedCells: [],
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
        setDifficulty: (state, action) => {
            state.difficulty = {
                id: action.payload.id,
                timer: action.payload.timer
            }
        },
        setWinner: (state, action) => {
            if (action.payload === undefined) {
                state.score.computer += 1;

                state.usedCells.splice(
                    state.usedCells.indexOf(state.winCell), // rewrite number with minus sign for indetify winner
                    1,
                    -state.winCell
                );
            } 
            
            if (action.payload === 'player') {
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
        resetStore: (state) => {
            state.winner = '';
            state.winCell = null;
            state.score = { player: 0, computer: 0 };
            state.usedCells = [];
            state.roundEnd = null;
        },
        randomNumber: (state) => {
            let status = false;

            while (!status) {
                // const random = Math.floor(Math.random() * 100);
                const random = Math.floor(Math.random() * (101 - 1) + 1);

                if (state.usedCells.includes(random) || state.usedCells.includes(-random)) {
                    continue;
                } else {
                    status = true;
                    state.winCell = random;
                    state.usedCells.push(random);
                }
            }
        },
        // checkWinner: (state) => {
        //     if (state.roundEnd === null || state.roundEnd) {
        //         state.roundEnd = false;
        //     } else {
        //         state.score.computer += 1;

        //         state.usedCells.splice(
        //             state.usedCells.indexOf(state.winCell), // rewrite number with minus sign for indetify winner
        //             1,
        //             -state.winCell
        //         );
        //     }

        //     if (state.score.computer >= (((state.fieldSize * state.fieldSize) / 2) + 1)) {
        //         state.winner = 'Computer';
        //     }

        //     if (state.score.computer === 50 && state.score.player === 50) {
        //         state.winner = 'Nobody won, try again';
        //     }
        // }
    }
})

export const {actions, reducer} = gameSlice;

export default reducer;
export const { 
    setGameStatus, setDifficulty, setWinner, 
    setRoundEnd, resetStore, randomNumber,
    checkWinner
} = actions;

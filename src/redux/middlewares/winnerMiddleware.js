import { setRoundEnd } from "../slices/gameSlice";

export const winnerMiddleware = store => next => action => {
    if (action.type === 'game/setWinner') {
        const { roundEnd } = store.getState().game;

        if (action.payload === 'player') {
            next(action);
        } else {
            if (roundEnd === null) {
                store.dispatch(setRoundEnd(false));
            } else if (!roundEnd) {
                next(action);
            } else store.dispatch(setRoundEnd(false));
        }
    } else next(action);
}
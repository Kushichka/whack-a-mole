import { useDispatch, useSelector } from 'react-redux';

import { resetStore, setGameStatus } from '../../redux/slices/gameSlice';
import { Difficulty } from '../Difficulty';
import { PlayerScore } from '../PlayerScore';

import style from './ScoreBoard.module.scss';

export const ScoreBoard = () => {
    const dispatch = useDispatch();

    const { gameStatus } = useSelector(state => state.game);

    const handleStart = (e) => {
        e.preventDefault();

        if (!gameStatus) {
            dispatch(resetStore());
        }
        
        dispatch(setGameStatus());
    }

    return (
        <div className={style.scoreBoard}>
            <PlayerScore name='Computer' />
            <div className={style.difficultyBoxWrapper}>
                <Difficulty />
                <button className={style.btn} onClick={handleStart}>
                    {!gameStatus ? 'Start' : 'Stop'}
                </button>
            </div>
            <PlayerScore name='Player' />
        </div>
    )
}

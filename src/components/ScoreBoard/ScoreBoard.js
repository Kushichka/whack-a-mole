import { useDispatch, useSelector } from 'react-redux';

import { setGameStatus } from '../../redux/reducers/gameReducer';
import { Difficulty } from '../Difficulty/Difficulty';
import { PlayerScore } from '../PlayerScore/PlayerScore';

import style from './ScoreBoard.module.scss';

export const ScoreBoard = () => {
    const dispatch = useDispatch();
    const { gameStatus } = useSelector(state => state.gameReducer);

    const handleStart = (e) => {
        e.preventDefault();

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

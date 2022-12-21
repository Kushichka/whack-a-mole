import { useDispatch, useSelector } from 'react-redux';

import { setGameStatus } from '../../redux/reducers/gameReducer';
import { Levels } from '../Levels/Levels';
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
            <div className={style.levelBoxWrapper}>
                <Levels />
                <button className={style.btn} onClick={handleStart}>
                    {!gameStatus ? 'Start' : 'Stop'}
                </button>
            </div>
            <PlayerScore name='Player' />
        </div>
    )
}

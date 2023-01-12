import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setWinner, setRoundEnd, setGameStatus, randomNumber, checkWinner } from '../../redux/reducers/gameSlice';
import { Cell } from '../Cell/Cell';

import style from './GameField.module.scss';

// использовать middleware для проверки клетки.
// 0 в массиве не может быть -0.

export const GameField = () => {
    const dispatch = useDispatch();

    const { gameStatus, difficulty, roundEnd, winCell,
            winner, fieldSize
        } = useSelector(state => state.game)

    const [field, setField] = useState([]);

    useEffect(() => {
        winner && dispatch(setGameStatus());
    }, [winner, dispatch])

    useEffect(() => {
        let newGame = null;

        if (gameStatus) {
            newGame = setInterval(() => {    
                dispatch(checkWinner()); // middleware вместо этой функции
                            
                dispatch(randomNumber());
                
                createField();
            }, difficulty.timer);
        } else {
            createField();
            clearInterval(newGame);
        }

        return () => {
            clearInterval(newGame);
        }
    }, [gameStatus]);

    // useEffect(() => {
    //     if (gameStatus) {
    //         createField();

            
    //     }
    // }, [winCell]);

    const createCells = (idx) => {
        const cells = [];

        for (let i = 0; i < fieldSize; i++) {
            cells[i] = <Cell
                        key={+`${idx}${i}`}
                        id={+`${idx}${i}`} />;
        }

        return cells;
    }

    const createField = () => {
        const rows = new Array(fieldSize).fill().map((_, idx) => (
            <tr key={idx}>{createCells(idx)}</tr>
        ))

        setField(rows);
    }

    return (
        <div className={style.wrapper}>
            <table>
                <tbody>
                    {field}
                </tbody>
            </table>
        </div>
    )
}

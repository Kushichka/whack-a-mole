import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    setWinCell, checkWinner, setRoundEnd,
    setGameStatus, setUsedCells 
} from '../../redux/reducers/gameSlice';
import { Cell } from '../Cell/Cell';

import style from './GameField.module.scss';

// usedCells приходит пустой.
// Клетка должна закрашиваться в красный цвет по истечению времени.

export const GameField = () => {
    const dispatch = useDispatch();

    const { gameStatus, difficulty, roundEnd, winCell,
            winner, fieldSize, usedCells
        } = useSelector(state => state.game)

    const [field, setField] = useState([]);

    useEffect(() => {
        winner && dispatch(setGameStatus());
    }, [winner])

    useEffect(() => {
        let newGame = null;

        if (gameStatus) {
            newGame = setInterval(() => {                
                randomNumber();
            }, difficulty.timer);
        } else {
            createField();
            clearInterval(newGame);
        }

        return () => {
            clearInterval(newGame);
        }
    }, [gameStatus]);

    useEffect(() => {
        if (gameStatus) {
            createField();

            if (roundEnd === null || roundEnd === true) {
                dispatch(setRoundEnd(false))
            } else {
                dispatch(checkWinner({winner: 'computer'}))
            }
        }
    }, [winCell]);

    const randomNumber = () => {
        let status = false;
        
        for (let i = 0; status === false; i++) {
            const random = Math.floor(Math.random() * 100);

            if (usedCells.includes(random)) {
                i++;
            } else {
                status = true;
                dispatch(setWinCell(random));
                dispatch(setUsedCells(random));
                // console.log(usedCells);
            }
        }
    }

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

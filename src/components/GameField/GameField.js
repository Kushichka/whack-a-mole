import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setWinCell, checkWinner, setRoundEnd, setIsPlayerWin } from '../../redux/reducers/gameReducer';
import { Cell } from '../Cell/Cell';

import style from './GameField.module.scss';

const fieldSize = 10;

// при нажатии стоп, генерировать поле без кликов
// генерировать уникальное число исходя из массива в сторе

export const GameField = () => {
    const dispatch = useDispatch();

    const { gameStatus, difficulty, roundEnd, winCell, isPlayerWin } = useSelector(state => state.gameReducer)

    const [cells, setCells] = useState([]);

    useEffect(() => {
        let newGame = null;

        if (gameStatus) {
            newGame = setInterval(() => {
                randomNumber();
            }, difficulty.timer);
        } else {
            clearInterval(newGame);
        }

        return () => {
            clearInterval(newGame);
        }
    }, [gameStatus]);

    useEffect(() => {
        createCells();

        if (gameStatus) {
            if (roundEnd) {
                if (isPlayerWin) {
                    dispatch(checkWinner({winner: 'player', winCell})) 
                } else {
                    dispatch(checkWinner({winner: 'computer', winCell}));
                }
    
                dispatch(setRoundEnd(false));
            } else {
                dispatch(checkWinner({winner: 'computer', winCell}));
            }
    
            isPlayerWin && dispatch(setIsPlayerWin(false));
        }
    }, [winCell])

    const randomNumber = () => {
        const rand = Math.floor(Math.random() * 100);
        dispatch(setWinCell(rand));
    }

    const createRow = (idx) => {
        const row = [];

        for (let i = 0; i < fieldSize; i++) {
            row[i] = <Cell
                key={+`${idx}${i}`}
                id={+`${idx}${i}`}
                gameStatus={gameStatus}
                setIsPlayerWin={setIsPlayerWin}
            />;
        }

        return row;
    }

    const createCells = () => {
        const cells = new Array(fieldSize).fill().map((row, idx) => (
            row = <tr key={idx}>{createRow(idx)}</tr>
        ))

        setCells(cells);
    }

    return (
        <div className={style.wrapper}>
            <table>
                <tbody>
                    {cells}
                </tbody>
            </table>
        </div>
    )
}

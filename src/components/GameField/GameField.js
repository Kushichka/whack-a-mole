import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWinCell } from '../../redux/reducers/gameReducer';

import { Cell } from '../Cell/Cell';

import style from './GameField.module.scss';

const fieldSize = 10;

export const GameField = () => {
    const dispatch = useDispatch();

    const { gameStatus, difficulty } = useSelector(state => state.gameReducer)

    const [cells, setCells] = useState([]);

    useEffect(() => {
        let newGame = null;

        if (gameStatus) {
            newGame = setInterval(() => {
                randomNumber();
                createCells();
            }, difficulty.timer);
        } else {
            createCells();
            clearInterval(newGame);
        }

        return () => {
            clearInterval(newGame);
        }
    }, [gameStatus]);

    const checkWinner = () => {
        
    }

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

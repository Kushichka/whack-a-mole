import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setGameStatus, randomNumber, checkWinner, setWinner } from '../../redux/slices/gameSlice';
import { Cell } from '../Cell';

import style from './GameField.module.scss';

// использовать middleware для проверки клетки.
// 0 в массиве не может быть -0.

export const GameField = () => {
    const dispatch = useDispatch();

    const { gameStatus, difficulty, winner, winCell } = useSelector(state => state.game)

    const [gameField, setGameField] = useState([]);

    // useEffect(() => {
    //     winner && dispatch(setGameStatus());
    // }, [winner, dispatch]);

    useEffect(() => {
        createField();
    }, []);

    const createField = () => {
        let array = [];

        for (let row = 0; row < 10; row++) {
            let rows = [];

            for (let td = 0; td < 10; td++) {
                const id = row === 0 ? td + 1 : +(`${row}${td}`) + 1;
                rows[td] = <Cell key={id} id={id} />;
            }

            array[row] = <tr key={row}>{[...rows]}</tr>;
        }

        setGameField(array);
    }

    useEffect(() => {
        let newGame = null;

        if (gameStatus) {
            newGame = setInterval(() => {    
                dispatch(setWinner()); // middleware вместо этой функции

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

        // eslint-disable-next-line
    }, [gameStatus]);

    // const createCells = (idx) => {
    //     const cells = [];

    //     for (let i = 0; i < fieldSize; i++) {
    //         cells[i] = <Cell
    //                     key={+`${idx}${i}`}
    //                     id={+`${idx}${i}`} />;
    //     }

    //     return cells;
    // }

    // const createField = () => {
    //     const rows = new Array(fieldSize).fill().map((_, idx) => (
    //         <tr key={idx}>{createCells(idx)}</tr>
    //     ))

    //     setField(rows);
    // }


    return (
        <div className={style.wrapper}>
            <table>
                <tbody>
                    {gameField && [...gameField]}
                </tbody>
            </table>
        </div>
    )
}

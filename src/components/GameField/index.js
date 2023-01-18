import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setGameStatus, randomNumber, setWinner } from '../../redux/slices/gameSlice';
import { Cell } from '../Cell';

import style from './GameField.module.scss';

export const GameField = () => {
    const dispatch = useDispatch();

    const { gameStatus, difficulty, winner } = useSelector(state => state.game)

    const [gameField, setGameField] = useState([]);

    useEffect(() => {
        winner && dispatch(setGameStatus());
        // eslint-disable-next-line
    }, [winner]);

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
                dispatch(setWinner());

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

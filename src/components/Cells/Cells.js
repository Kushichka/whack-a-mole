import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setWinCell } from '../../redux/reducers/gameReducer';

import style from './Cells.module.scss';

export const Cells = () => {

    const dispatch = useDispatch();
    const { gameStatus, winCell, level } = useSelector(state => state.gameReducer);

    const handleClick = (e) => {
        e.preventDefault();
        +e.target.id === winCell ? console.log('you win') : console.log('you lose');
        console.log(e.target.id);
    }

    const randomNumber = () => {
        const rand = Math.floor(Math.random() * 100);
        dispatch(setWinCell(rand));
    }

    useEffect(() => {
        let newGame = null;
        if(gameStatus) {
            newGame = setInterval(() => {
                randomNumber();
                createCells(true);
            }, level.timer);

        } else {
            clearInterval(newGame);
            createCells(false);
        }

        return () => {
            clearInterval(newGame);
        }
    }, [gameStatus]);

    const createCells = (runGame) => { 
        const cells = [];
        let id = 0;

        for (let tr = 0; tr < 10; tr++) {
            const row = [];

            for (let td = 0; td < 10; td++) {
                row.push(
                    <td 
                        key={id} 
                        className={`${style.cell} ${runGame && winCell === id ? style.blue : ''}`} 
                        id={id} 
                        onClick={runGame ? handleClick : null}
                    >
                    </td>
                )
                id++;
            }
            
            cells.push(<tr key={id}>{[...row]}</tr>)
        }

        return cells;
    }

    return (
        <div className={style.wrapper}>
            <table>
                <tbody>
                    {createCells(gameStatus)}
                </tbody>
            </table>
        </div>
    )
}

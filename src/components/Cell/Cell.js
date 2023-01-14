import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { setWinner, setRoundEnd } from '../../redux/slices/gameSlice';

import style from './Cell.module.scss';

export const Cell = ({id}) => {
    const dispatch = useDispatch();

    const { winCell, gameStatus, usedCells } = useSelector(state => state.game);

    const [isHit, setIsHit] = useState(false);

    useEffect(() => {
        if (!gameStatus) {
            setIsHit(null);
        }
    }, [gameStatus]);
    

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(setWinner({winner: 'player'}));
        dispatch(setRoundEnd(true));
        setIsHit(true);
    }

    const classes = classNames(style.cell, {
        [style.blue]: gameStatus && winCell === id,
        [style.green]: gameStatus && usedCells.find(num => num === id) && isHit,
        [style.red]: gameStatus && usedCells.find(num => num === -id) && !isHit
    })

    return (
        <>
            <td
                className={classes}
                id={id}
                onClick={gameStatus && winCell === id ? handleClick : null}
            >
                {/* {id} */}
            </td>
        </>
    )
};

Cell.propTypes = {
    id: PropTypes.number.isRequired
}
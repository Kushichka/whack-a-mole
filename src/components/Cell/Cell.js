import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { checkWinner, setRoundEnd } from '../../redux/reducers/gameSlice';

import style from './Cell.module.scss';

export const Cell = ({id}) => {
    const dispatch = useDispatch();

    const { winCell, gameStatus } = useSelector(state => state.game);

    const [isHit, setIsHit] = useState(null);

    useEffect(() => {
        if (!gameStatus) {
            setIsHit(null);
        }
    }, [gameStatus]);
    

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(checkWinner({winner: 'player'}));
        dispatch(setRoundEnd(true));
        setIsHit(true);
    }

    const classes = classNames(style.cell, {
        [style.blue]: gameStatus && winCell === id,
        [style.green]: gameStatus && isHit,
        [style.red]: gameStatus && isHit === false
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
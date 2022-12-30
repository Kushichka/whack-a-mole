import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import style from './Cell.module.scss';

export const Cell = ({id, gameStatus}) => {
    const { winCell } = useSelector(state => state.gameReducer);

    const handleClick = (e) => {
        e.preventDefault();
        +e.target.id === winCell ? console.log('you win') : console.log('you lose');
        console.log(e.target.id);
    }

    return (
        <>
            <td
                className={`${style.cell} ${gameStatus && winCell === id ? style.blue : ''}`}
                id={id}
                onClick={gameStatus ? handleClick : null}
            >
                {id}
            </td>
        </>
    )
};

Cell.propTypes = {
    id: PropTypes.number,
    gameStatus: PropTypes.bool
}
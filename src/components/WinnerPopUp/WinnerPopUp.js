import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { resetStore } from '../../redux/reducers/gameSlice';

import style from './WinnerPopUp.module.scss';

export const WinnerPopUp = ({winner}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(resetStore());
    }
    
    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <p>{winner} {winner.length > 10 ? '' : 'win!'}</p>
                <button
                    className={style.btn}
                    onClick={handleClick}
                >
                    ok
                </button>
            </div>
        </div>
    )
};

WinnerPopUp.propTypes = {
    winner: PropTypes.string
}
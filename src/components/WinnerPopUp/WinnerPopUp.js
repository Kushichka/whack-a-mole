import style from './WinnerPopUp.module.scss';
import PropTypes from 'prop-types';

export const WinnerPopUp = ({winner}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <p>{winner} win!</p>
            </div>
        </div>
    )
};

WinnerPopUp.propTypes = {
    winner: PropTypes.string
}
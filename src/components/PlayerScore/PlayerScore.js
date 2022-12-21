import { useSelector } from 'react-redux';

import style from './PlayerScore.module.scss';

export const PlayerScore = ({name}) => {
    const { score } = useSelector(state => state.gameReducer); 

    const element = () => {
        if(name === 'Computer')  {
            return (
                <div className={style.playerScore}>
                    <p className={style.playerName}>{name}</p>
                    <div className={style.playerScore}>{score.computer}</div>
                </div>
            )
        } else {
            return (
                <div className={style.playerScore}>
                    <div className={style.playerScore}>{score.player}</div>
                    <p className={style.playerName}>{name}</p>
                </div>
            )
        }
    }

    return (
        element()
    )
}

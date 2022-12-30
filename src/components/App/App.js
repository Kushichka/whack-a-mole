import { useSelector } from 'react-redux';

import { GameField } from '../GameField/GameField';
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import { WinnerPopUp } from '../WinnerPopUp/WinnerPopUp';

import style from './App.module.scss';


function App() {
  const { winner } = useSelector(state => state.gameReducer);

  return (
    <div className={style.app}>
      <main className={style.wrapper}>
          <div className={style.gameBox}>
            <ScoreBoard />
            <GameField />
            {winner && <WinnerPopUp winner={winner}/>}
          </div>
      </main>
    </div>
  );
}

export default App;

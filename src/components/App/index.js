import { useSelector } from 'react-redux';
import { GameField } from '../GameField';
import { ScoreBoard } from '../ScoreBoard';
import { WinnerPopUp } from '../WinnerPopUp';

import style from './App.module.scss';


function App() {
  const { winner } = useSelector(state => state.game);
  
  return (
    <div className={style.app}>
      <main className={style.wrapper}>
          <div className={style.gameBox}>
            <ScoreBoard />
            <GameField />
            {winner && <WinnerPopUp winner={winner} />}
          </div>
      </main>
    </div>
  );
}

export default App;

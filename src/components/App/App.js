import { Cells } from '../Cells/Cells';
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';

import style from './App.module.scss';


function App() {

  return (
    <div className={style.app}>
      <main className={style.wrapper}>
          <div className={style.gameBox}>
            <ScoreBoard />
            <Cells />
          </div>
      </main>
    </div>
  );
}

export default App;

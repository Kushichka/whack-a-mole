import { useDispatch } from 'react-redux';

import { setDifficulty } from '../../redux/reducers/gameReducer';

import style from './Difficulty.module.scss';

const elements = [
    {name: 'easy', id: 0, timer: 1500},
    {name: 'medium', id: 1, timer: 1000},
    {name: 'hard', id: 2, timer: 500}
];

export const Difficulty = () => {
    const dispatch = useDispatch();

    const difficultHandler = (e) => {
        dispatch(setDifficulty(elements[e.target.value]));
    }

    const difficulty = elements.map(({name, id}) => {
        return (
            <div key={name} className={style.difficultyBox}>
                <input 
                    type="radio" 
                    name='difficulty' 
                    id={name} 
                    value={id} 
                    onChange={difficultHandler}
                    defaultChecked = {id === 0 ? true : false}
                />
                <label htmlFor={name}>{name}</label>
            </div>
        )
    });

    return (
        <>
            {difficulty}
        </>
    )
}

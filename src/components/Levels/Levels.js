import { useDispatch } from 'react-redux';

import { setLevel } from '../../redux/reducers/gameReducer';

import style from './Levels.module.scss';

const elements = [
    {name: 'easy', id: 0, timer: 1500},
    {name: 'medium', id: 1, timer: 1000},
    {name: 'hard', id: 2, timer: 500}
];

export const Levels = () => {
    const dispatch = useDispatch();

    const levelHandler = (e) => {
        dispatch(setLevel(elements[e.target.value]));
    }

    const level = elements.map(({name, id}) => {
        return (
            <div key={name} className={style.levelBox}>
                <input 
                    type="radio" 
                    name='level' 
                    id={name} 
                    value={id} 
                    onChange={levelHandler}
                    defaultChecked = {id === 0 ? true : false}
                />
                <label htmlFor={name}>{name}</label>
            </div>
        )
    });

    return (
        <>
            {level}
        </>
    )
}

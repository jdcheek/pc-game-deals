import React, { useState } from "react";
import style from "../styles/SortPopup.module.css";

export default function SortPopup({
  setSort,
  setTogglePopup,
  sort,
  setGameResults,
}) {
  const [sortState, setSortState] = useState(sort);

  const handleChange = (e) => {
    setSortState({ ...sortState, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setGameResults([]);
    setSort(sortState);
    setTogglePopup(false);
  };
  return (
    <div className='overlay'>
      <div className='popup'>
        <div className={style.closeBtn}>
          <button onClick={() => setTogglePopup(false)}>CLOSE</button>
        </div>
        <div className={style.content}>
          <div className={style.filter}>
            <span className={style.heading}>FILTER</span>
            <div className={style.option}>
              <span>MIN STEAM RATING: {sortState.steamRating}%</span>
              <input
                name='steamRating'
                type='range'
                min='0'
                max='90'
                step='5'
                value={sortState.steamRating}
                onChange={(e) => handleChange(e)}></input>
            </div>
            <div className={style.option}>
              <span>MIN METACRITIC RATING: {sortState.metacritic}</span>
              <input
                name='metacritic'
                type='range'
                min='0'
                max='100'
                step='10'
                value={sortState.metacritic}
                onChange={(e) => handleChange(e)}></input>
            </div>
            <div className={style.option}>
              <span>MAX PRICE: {sortState.upperPrice}</span>
              <input
                name='upperPrice'
                type='range'
                min='0'
                max='50'
                step='.5'
                value={sortState.upperPrice}
                onChange={(e) => handleChange(e)}></input>
            </div>
          </div>
          <div className={style.sort}>
            <span className={style.heading}>SORT</span>
            <div className={style.option}>
              <span>PRICE</span>
            </div>
            <div className={style.option}>
              <span>SAVINGS</span>
            </div>
            <div className={style.option}>
              <span>REVIEWS</span>
            </div>
            <div className={style.option}>
              <span>DESCEND / ASCEND</span>
            </div>
          </div>
        </div>
        <div className={style.btnContainer}>
          <button
            onClick={() =>
              setSortState({
                direction: 0,
                sortBy: "savings",
                upperPrice: 15,
                steamRating: 0,
                metacritic: 0,
              })
            }>
            RESET
          </button>
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

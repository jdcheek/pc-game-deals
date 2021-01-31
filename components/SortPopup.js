import React, { useState } from "react";
import style from "../styles/SortPopup.module.css";

export default function SortPopup({
  setSort,
  setToggleSortPopup,
  sort,
  setGameResults,
  setPage,
}) {
  const [sortState, setSortState] = useState(sort);
  const [defaultSort, setDefaultSort] = useState(sort);

  const handleChange = (e) => {
    setSortState({ ...sortState, [e.target.name]: e.target.value });
  };
  console.log(sortState);

  const handleClick = (e) => {
    setSortState({
      ...sortState,
      [e.target.attributes.name.value]: e.target.attributes.value.value,
    });
  };

  const reset = () => {
    setPage(0);
    setGameResults([]);
  };

  const handleSubmit = () => {
    reset();
    setSort(sortState);
    setToggleSortPopup(false);
  };

  return (
    <div className='overlay'>
      <div className='popup'>
        <div className={style.closeBtn}>
          <button onClick={() => setToggleSortPopup(false)}>CLOSE</button>
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
                step='1'
                value={sortState.upperPrice}
                onChange={(e) => handleChange(e)}></input>
            </div>
          </div>
          <div className={style.sort}>
            <span className={style.heading}>SORT</span>
            <div className={style.option}>
              <span
                onClick={(e) => handleClick(e)}
                className={
                  sortState.sortBy === "price" ? null : style.sortSelection
                }
                value='price'
                name='sortBy'>
                PRICE
              </span>
            </div>
            <div className={style.option}>
              <span
                onClick={(e) => handleClick(e)}
                className={
                  sortState.sortBy === "savings" ? null : style.sortSelection
                }
                value='savings'
                name='sortBy'>
                SAVINGS
              </span>
            </div>
            <div className={style.option}>
              <span
                onClick={(e) => handleClick(e)}
                className={
                  sortState.sortBy === "reviews" ? null : style.sortSelection
                }
                value='reviews'
                name='sortBy'>
                REVIEWS
              </span>
            </div>
            <div className={style.option}>
              <span>
                {sortState.direction === "0" ? (
                  <span
                    value='1'
                    name='direction'
                    onClick={(e) => handleClick(e)}>
                    ASCEND
                  </span>
                ) : (
                  <span
                    value='0'
                    name='direction'
                    onClick={(e) => handleClick(e)}>
                    DESCEND
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className={style.btnContainer}>
          <button
            onClick={() =>
              setSortState({
                direction: "0",
                sortBy: "savings",
                upperPrice: "15",
                steamRating: "0",
                metacritic: "0",
              })
            }>
            RESET
          </button>
          <button disabled={defaultSort === sortState} onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

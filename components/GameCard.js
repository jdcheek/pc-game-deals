import { React, useState } from "react";
import style from "../styles/GameCard.module.css";
import EmailIcon from "./svg/EmailIcon";
import MoreIcon from "./svg/MoreIcon";
import LessIcon from "./svg/LessIcon";

function GameCard({ games }) {
  const [toggle, setToggle] = useState({
    isToggled: false,
  });

  const dropDownOnClickHandler = (gameID) => {
    if (toggle.id === gameID) {
      setToggle({
        ...toggle,
        id: "",
      });
    } else if (toggle.id != gameID) {
      setToggle({
        ...toggle,
        isToggled: !toggle.isToggled,
        id: gameID,
      });
    }
  };

  return (
    <div className={style.container}>
      {games.map((game) => (
        <div
          key={game.gameID}
          className={style.card}
          onClick={(e) => dropDownOnClickHandler(game.gameID)}>
          <div className={style.info}>
            <h1>steam rating</h1>
            <span>{game.steamRatingPercent}%</span>
          </div>
          <img
            src={game.thumb}
            alt={`${game.title} thumbnail`}
            className={style.thumb}
          />
          <span className={style.title}>{game.title}</span>
          <div className={style.price}>
            <span className={style.normal}>{game.normalPrice}</span>
            <span className={style.sale}>${game.salePrice}</span>
            <span className={style.savings}>
              {Math.floor(game.savings)}% OFF
            </span>
          </div>
          <div className={style.arrow}>
            {toggle.id === game.gameID ? <LessIcon /> : <MoreIcon />}
          </div>
          {toggle.id === game.gameID ? <br></br> : null}
          <div
            className={toggle.id === game.gameID ? null : style.hideDropdown}>
            <div className={style.dropdown}>
              <span>heres some stuff</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameCard;

import { React, useState } from "react";
import style from "../styles/GameCard.module.css";
import EmailIcon from "./svg/EmailIcon";
import MoreIcon from "./svg/MoreIcon";
import LessIcon from "./svg/LessIcon";

function GameCard({ games }) {
  const [toggle, setToggle] = useState({
    isToggled: false,
  });
  return (
    <div className={style.container}>
      {games.map((game) => (
        <div className={style.card}>
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
            <MoreIcon />
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameCard;

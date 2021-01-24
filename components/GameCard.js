import { React, useState } from "react";
import style from "../styles/GameCard.module.css";
import EmailIcon from "./svg/EmailIcon";
import SteamIcon from "./svg/SteamIcon";
import MoreIcon from "./svg/MoreIcon";
import LessIcon from "./svg/LessIcon";

function GameCard({ games }) {
  const [toggle, setToggle] = useState({
    isToggled: false,
  });

  const dropDownOnClickHandler = (gameID) => {
    if (toggle.id === gameID) {
      setToggle({
        isToggled: false,
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
        <div key={game.gameID} className={style.card}>
          <div className={style.steamRating}>
            <h1>steam rating</h1>
            <span>{game.steamRatingPercent}%</span>
          </div>
          <div className={style.content}>
            <div className={style.thumb}>
              <img src={game.thumb} alt={`${game.title} thumbnail`} />
            </div>
            <span className={style.title}>{game.title}</span>
            <div className={style.price}>
              <span className={style.normal}>{game.normalPrice}</span>
              <span className={style.sale}>${game.salePrice}</span>
              <span className={style.savings}>
                {Math.floor(game.savings)}% OFF
              </span>
            </div>
            <div
              className={style.arrow}
              onClick={(e) => dropDownOnClickHandler(game.gameID)}>
              {toggle.id === game.gameID ? <LessIcon /> : <MoreIcon />}
            </div>
            {toggle.id === game.gameID ? (
              <div className={style.dropdown}>
                <div className={style.actions}>
                  <span>Metacritic Score: {game.metacriticScore}</span>
                  <span>
                    {game.steamRatingText} - {game.steamRatingPercent}% of{" "}
                    {game.steamRatingCount} reviews
                  </span>
                </div>
                <div className={style.actions}>
                  <div className={style.iconAction}>
                    <SteamIcon />
                    <span>View steam page</span>
                  </div>
                  <div className={style.iconAction}>
                    <EmailIcon />
                    <span>Set up price notification</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameCard;

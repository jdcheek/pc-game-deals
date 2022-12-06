import React, { useState, useEffect } from "react";
import style from "../styles/GameCard.module.css";
import EmailPopup from "../components/EmailPopup";
import EmailIcon from "./svg/EmailIcon";
import SteamIcon from "./svg/SteamIcon";
import MoreIcon from "./svg/MoreIcon";
import LessIcon from "./svg/LessIcon";

function GameCard({ games, fetchNextPage }) {
  const [toggleEmailPopup, setToggleEmailPopup] = useState(false);
  const [toggle, setToggle] = useState({
    isToggled: false,
    id: "",
  });

  const dropDownOnClickHandler = (dealID) => {
    if (toggle.id === dealID) {
      setToggle({
        isToggled: false,
        id: "",
      });
    } else if (toggle.id !== dealID) {
      setToggle({
        isToggled: !toggle.isToggled,
        id: dealID,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = async () => {
    const lastItem = document.querySelector(".gamecard:last-child");
    if (lastItem) {
      const lastItemLoadedOffset = lastItem.offsetTop + lastItem.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastItemLoadedOffset) {
        fetchNextPage();
      }
    }
  };

  return (
    <div className='gamecard-container'>
      {games.map((game) => (
        <div key={game.dealID} className='gamecard'>
          <div className={style.content}>
          <div className={style.steamRating}>
            <h1>steam rating</h1>
            <span>{game.steamRatingPercent}%</span>
          </div>
            <div className={style.thumb}>
              <img src={game.thumb} alt={`${game.title} thumbnail`} />
            </div>
            <span className={style.title}>
              {game.title.length > 60
                ? game.title.slice(0, -20) + "..."
                : game.title}
            </span>
            <div className={style.price}>
              {game.normalPrice !== game.salePrice && (
                <span className={style.normal}>{game.normalPrice}</span>
              )}
              <span className={style.sale}>${game.salePrice}</span>
              <span className={style.savings}>
                {Math.floor(game.savings)}% OFF
              </span>
            </div>
            <div
              className={style.arrow}
              onClick={(e) => dropDownOnClickHandler(game.dealID)}>
              {toggle.id === game.dealID ? <LessIcon /> : <MoreIcon />}
            </div>
              <div className={style.dropdown}>
                <div className={style.actions}>
                  <span>Metacritic Score: {game.metacriticScore}</span>
                  <span>
                    {game.steamRatingText} - {game.steamRatingPercent}% of{" "}
                    {game.steamRatingCount} reviews
                  </span>
                </div>
                <div className={style.actions}>
                  <a
                    href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
                    rel='noreferrer noopener'
                    target='_blank'
                    className={style.iconAction}>
                    <SteamIcon />
                    <span>View steam page</span>
                  </a>
                  <a
                    onClick={() => setToggleEmailPopup(true)}
                    className={style.iconAction}>
                    <EmailIcon />
                    <span>Set up price notification</span>
                  </a>
                </div>
              </div>
          </div>
        </div>
      ))}
      {toggleEmailPopup ? (
        <EmailPopup
          setToggleEmailPopup={setToggleEmailPopup}
          gameID={toggle.id}
        />
      ) : null}
    </div>
  );
}

export default GameCard;

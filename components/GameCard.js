import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "../styles/GameCard.module.css";
import EmailIcon from "./svg/EmailIcon";
import SteamIcon from "./svg/SteamIcon";
import MoreIcon from "./svg/MoreIcon";
import LessIcon from "./svg/LessIcon";

function GameCard({ games, curPage }) {
  const router = useRouter();
  const [gameList, setGameList] = useState([]);
  const [toggle, setToggle] = useState({
    isToggled: false,
    id: "",
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

  useEffect(() => {
    if (games) {
      if (games.error) {
        console.log("error");
      } else {
        setGameList(gameList.concat(games));
      }
    }
  }, [games]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // TODO  need to set scroll height to last item, currently defaults to top of page

  const handleScroll = () => {
    const lastItem = document.querySelector(
      ".gamecard-container > .gamecard:last-child"
    );
    if (lastItem) {
      const lastItemLoadedOffset = lastItem.offsetTop + lastItem.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > lastItemLoadedOffset) {
        const query = router.query;
        query.page = parseInt(curPage) + 1;
        router.push(
          {
            pathname: "/",
            query: { page: query.page },
          },
          "/"
        );
      }
    }
  };

  return (
    <div className='gamecard-container'>
      {gameList.map((game) => (
        <div key={game.gameID} className='gamecard'>
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
                  <a
                    href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
                    rel='noreferrer noopener'
                    target='_blank'
                    className={style.iconAction}>
                    <SteamIcon />
                    <span>View steam page</span>
                  </a>
                  <a href='#' className={style.iconAction}>
                    <EmailIcon />
                    <span>Set up price notification</span>
                  </a>
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

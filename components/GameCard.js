import { React, useState } from "react";

function GameCard({ games }) {
  const [toggle, setToggle] = useState({
    isToggled: true,
  });
  return (
    <div>
      {games.map((game) => (
        <li
          onClick={(e) =>
            setToggle({
              ...toggle,
              isToggled: !toggle.isToggled,
              id: game.gameID,
            })
          }
          key={game.gameID}>
          {toggle.isToggled
            ? toggle.id !== game.gameID
              ? game.title
              : game.steamRatingText
            : game.title}
        </li>
      ))}
    </div>
  );
}

export default GameCard;

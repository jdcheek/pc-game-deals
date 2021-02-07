import React, { useState } from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

import style from "../styles/Navbar.module.css";

export default function Navbar() {
  const [menuOpenState, setMenuOpenState] = useState(true);

  const stateChangeHandler = (newState) => {
    setMenuOpenState(newState.isOpen);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setMenuOpenState(!menuOpenState);
  };

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <h1 className={style.title}>PC GAME DEALS</h1>
        <div className={style.nav}>
          <Link href='/'>
            <a>home</a>
          </Link>
          <Link href='/browse'>
            <a>browse</a>
          </Link>
          <Link href='/search'>
            <a>search</a>
          </Link>
        </div>
        <div className={style.menu}>
          <Menu
            isOpen={menuOpenState}
            onStateChange={(state) => stateChangeHandler(state)}>
            <div className='menu-item' onClick={(e) => handleClick(e)}>
              <Link href='/'>
                <a>HOME</a>
              </Link>
            </div>
            <div className='menu-item' onClick={(e) => handleClick(e)}>
              <Link href='/browse'>
                <a>BROWSE</a>
              </Link>
            </div>
            <div className='menu-item' onClick={(e) => handleClick(e)}>
              <Link href='/search'>
                <a>SEARCH</a>
              </Link>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}

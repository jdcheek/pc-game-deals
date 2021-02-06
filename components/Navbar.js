import React from "react";
import Link from "next/link";
import style from "../styles/Navbar.module.css";

export default function Navbar() {
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
        <div className={style.burger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

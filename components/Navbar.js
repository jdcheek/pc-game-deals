import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <h3>PC GAME DEALS</h3>
      <Link href='/'>
        <a>home</a>
      </Link>
      <Link href='/browse'>
        <a>browse</a>
      </Link>
      <Link href='/search'>
        <a>search</a>
      </Link>
      <input type='text' />
    </div>
  );
}

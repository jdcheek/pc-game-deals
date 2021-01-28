import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import style from "../styles/Browse.module.css";

export default function Browse({ games }) {
  const [loading, setLoading] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [page, setPage] = useState(0);

  const fetchNextPage = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}&upperPrice=15&pageNumber=${page}&pageSize=10`
      );
      if (res.status !== 200) {
        return console.log("Failed to fetch" + res.status);
      }
      games = await res.json();
      if (games.length > 0) {
        setGameResults(gameResults.concat(games));
        setPage(page + 1);
      }
    } catch (err) {
      games = { error: { message: err.message } };
    }
    setLoading(false);
  };

  useEffect(() => {
    setGameResults(games);
  }, []);

  useEffect(() => {
    setPage(page + 1);
  }, []);

  return (
    <div>
      <Head>
        <title>PC GAME DEALS - Browse</title>
      </Head>
      <Navbar />
      <div className='nav-buffer'></div>
      <div className='page-container'>
        <h1 className={style.title}>BROWSE TITLES</h1>
        <GameCard games={gameResults} fetchNextPage={fetchNextPage} />
        {loading && (
          <div className={"loader"}>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  let games = null;

  try {
    const res = await fetch(
      `${process.env.FETCH_URL}&upperPrice=15&pageNumber=0&pageSize=10`
    );
    if (res.status !== 200) {
      return console.log("Failed to fetch" + res.status);
    }
    games = await res.json();
  } catch (err) {
    games = { error: { message: err.message } };
  }
  return { props: { games } };
};

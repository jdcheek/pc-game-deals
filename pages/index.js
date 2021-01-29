import React, { useState, useEffect } from "react";
import Head from "next/head";
import style from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";

export default function Home({ games }) {
  const [loading, setLoading] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);

  const fetchNextPage = async () => {
    end ? setLoading(false) : setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}&onSale=1&upperPrice=15&AAA=1&pageNumber=${page}&pageSize=10`
      );
      if (res.status !== 200) {
        return console.log("Failed to fetch" + res.status);
      }
      games = await res.json();
      if (games.length > 0) {
        setGameResults(gameResults.concat(games));
        setPage(page + 1);
      } else {
        setEnd(true);
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
        <title>PC GAME DEALS</title>
      </Head>
      <Navbar />
      <div className='nav-buffer'></div>
      <div className='page-container'>
        <h1 className={style.title}>TOP AAA DEALS</h1>
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
      `${process.env.FETCH_URL}&onSale=1&upperPrice=15&AAA=1&pageNumber=0&pageSize=10`
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

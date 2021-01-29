import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import SortPopup from "../components/SortPopup";
import style from "../styles/Browse.module.css";

export default function Browse({ games }) {
  const [loading, setLoading] = useState(false);
  const [togglePopup, setTogglePopup] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    direction: 0,
    sortBy: "savings",
    upperPrice: 15,
    steamRating: 0,
    metacritic: 0,
  });

  const fetchNextPage = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}&onSale=1&upperPrice=${sort.upperPrice}&pageNumber=${page}&pageSize=10&sortBy=${sort.sortBy}&desc=${sort.direction}&steamRating=${sort.steamRating}&metacritic=${sort.metacritic}`
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
    fetchNextPage();
  }, [sort]);

  return (
    <div>
      <Head>
        <title>PC GAME DEALS - Browse</title>
      </Head>
      <Navbar />
      {togglePopup && (
        <SortPopup
          setSort={setSort}
          sort={sort}
          setTogglePopup={setTogglePopup}
          setGameResults={setGameResults}
        />
      )}
      <div className='nav-buffer'></div>
      <div className='page-container'>
        <div className={style.header}>
          <h1 className={style.title}>BROWSE TITLES</h1>
          <button onClick={() => setTogglePopup(true)}>FILTER/SORT</button>
        </div>
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
  let page = 0;

  const sort = {
    direction: 0,
    sortBy: "savings",
    upperPrice: 15,
    reviews: 0,
    metacritic: 0,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}&onSale=1&upperPrice=${sort.upperPrice}&pageNumber=${page}&pageSize=10&sortBy=${sort.sortBy}&desc=${sort.direction}&steamRating=${sort.reviews}&metacritic=${sort.metacritic}`
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

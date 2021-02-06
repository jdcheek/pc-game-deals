import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import SortPopup from "../components/SortPopup";
import TopButton from "../components/TopButton";

export default function Browse({ games }) {
  const [loading, setLoading] = useState(false);
  const [toggleSortPopup, setToggleSortPopup] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    onSale: false,
    direction: "0",
    sortBy: "savings",
    upperPrice: "15",
    steamRating: "0",
    metacritic: "0",
  });

  const fetchNextPage = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}&onSale=1&upperPrice=${sort.upperPrice}&pageNumber=${page}&pageSize=20&sortBy=${sort.sortBy}&desc=${sort.direction}&steamRating=${sort.steamRating}&metacritic=${sort.metacritic}`
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
      {toggleSortPopup && (
        <SortPopup
          setSort={setSort}
          sort={sort}
          setToggleSortPopup={setToggleSortPopup}
          setGameResults={setGameResults}
          setPage={setPage}
        />
      )}
      <div className='nav-buffer'></div>
      <div className='page-container'>
        <div className={"header"}>
          <h1 className={"title"}>BROWSE TITLES</h1>
          <button onClick={() => setToggleSortPopup(true)}>FILTER/SORT</button>
        </div>
        <GameCard games={gameResults} fetchNextPage={fetchNextPage} />
        {loading ? (
          <div className='loader'>
            <p>Loading...</p>
          </div>
        ) : gameResults.length === 0 ? (
          <div className='loader'>
            <p>No results found...</p>
          </div>
        ) : null}
        <TopButton />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
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
      `${process.env.NEXT_PUBLIC_FETCH_URL}&onSale=1&upperPrice=${sort.upperPrice}&pageNumber=${page}&pageSize=20&sortBy=${sort.sortBy}&desc=${sort.direction}&steamRating=${sort.reviews}&metacritic=${sort.metacritic}`
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

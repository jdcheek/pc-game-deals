import React, { useState, useEffect } from "react";
import Head from "next/head";
import style from "../styles/Home.module.css";
import GameCard from "../components/GameCard";
import TopButton from "../components/TopButton";

export default function Home({ games }) {
  const [loading, setLoading] = useState(false);
  const [toggleSortPopup, setToggleSortPopup] = useState(false);
  const [resultsMessage, setResultsMessage] = useState(false);
  const [gameResults, setGameResults] = useState(games);
  const [pageEnd, setPageEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    onSale: true,
    direction: "0",
    sortBy: "savings",
    upperPrice: "15",
    steamRating: "0",
    metacritic: "0",
  });

  const fetchNextPage = async () => {
    if (pageEnd) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}&onSale=${
          sort.onSale ? "1" : "0"
        }&upperPrice=${sort.upperPrice}&pageNumber=${page}&pageSize=20&sortBy=${
          sort.sortBy
        }&desc=${sort.direction}&steamRating=${sort.steamRating}&metacritic=${
          sort.metacritic
        }&AAA=1`
      );
      if (res.status !== 200) {
        return console.log("Failed to fetch" + res.status);
      }
      games = await res.json();
      if (games.length > 0) {
        setGameResults(gameResults.concat(games));
        setPage(page + 1);
      } else {
        setResultsMessage(true);
        setPageEnd(true);
      }
    } catch (err) {
      games = { error: { message: err.message } };
    }
    setLoading(false);
  };

  const fetchFirstPage = async () => {
    setLoading(true);
    setResultsMessage(false);
    setGameResults([]);
    setPageEnd(false);
    setPage(0);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}&onSale=${
          sort.onSale ? "1" : "0"
        }&upperPrice=${sort.upperPrice}&pageNumber=${page}&pageSize=20&sortBy=${
          sort.sortBy
        }&desc=${sort.direction}&steamRating=${sort.steamRating}&metacritic=${
          sort.metacritic
        }&AAA=1`
      );
      if (res.status !== 200) {
        return console.log("Failed to fetch" + res.status);
      }
      const games = await res.json();
      if (games.length > 0) {
        setGameResults(games);
        setPage(1);
      } else {
        setResultsMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFirstPage();
  }, [sort]);

  return (
    <div>
      <Head>
        <title>PC GAME DEALS - Home</title>
      </Head>
      <div className='page-container'>
        <div className={"header"}>
          <h1 className={"title"}>AAA TITLES</h1>
        </div>
        <GameCard games={gameResults} fetchNextPage={fetchNextPage} />
        {loading && (
          <div className='loader'>
            <p>Loading...</p>
          </div>
        )}
        {resultsMessage && (
          <div className='loader'>
            {gameResults.length > 0 ? (
              <p>End of results...</p>
            ) : (
              <p>No results found...</p>
            )}
          </div>
        )}
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
      `${process.env.NEXT_PUBLIC_FETCH_URL}&onSale=1&upperPrice=${sort.upperPrice}&pageNumber=${page}&pageSize=50&sortBy=${sort.sortBy}&desc=${sort.direction}&steamRating=${sort.reviews}&metacritic=${sort.metacritic}`
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

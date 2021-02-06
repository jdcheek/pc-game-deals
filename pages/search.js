import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import TopButton from "../components/TopButton";
import SortPopup from "../components/SortPopup";
import style from "../styles/Search.module.css";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [resultsMessage, setResultsMessage] = useState(false);
  const [toggleSortPopup, setToggleSortPopup] = useState(false);
  const [page, setPage] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [pageEnd, setPageEnd] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({
    onSale: false,
    sortBy: "savings",
    upperPrice: "50",
    steamRating: "0",
    metacritic: "0",
    direction: "0",
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
        }&upperPrice=${sort.upperPrice}&pageNumber=${page}&pageSize=10&sortBy=${
          sort.sortBy
        }&desc=${sort.direction}&steamRating=${sort.steamRating}&metacritic=${
          sort.metacritic
        }&title=${query}`
      );
      if (res.status !== 200) {
        return console.log("Failed to fetch" + res.status);
      }
      const games = await res.json();
      if (games.length > 0) {
        setGameResults(gameResults.concat(games));
        setPage(page + 1);
      } else {
        setResultsMessage(true);
        setPageEnd(true);
      }
    } catch (err) {
      console.log(err);
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
        }&title=${query}`
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // remove whitespace, required for url parameter
    setQuery(query.replace(" ", ""));
    fetchFirstPage();
  };

  useEffect(() => {
    if (query) {
      fetchFirstPage();
    }
  }, [sort]);

  return (
    <div>
      <Head>
        <title>PC GAME DEALS - Search</title>
        <link rel='icon' href='/favicon.ico' />
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
          <h1 className={"title"}>SEARCH TITLES</h1>
          <button onClick={() => setToggleSortPopup(true)}>FILTER/SORT</button>
        </div>
        <div className={style.searchForm}>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <label htmlFor='search'></label>
            <input
              value={sort.query}
              required
              type='text'
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={(e) => handleSubmit(e)}>SEARCH</button>
          </form>
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

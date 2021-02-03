import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [pageEnd, setPageEnd] = useState(false);
  const [sort, setSort] = useState({
    query: "",
    onSale: "0",
    upperPrice: "50",
    steamRating: "0",
    metacritic: "0",
    direction: "0",
  });

  const fetchNextPage = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}&onSale=${sort.onSale}&upperPrice=${sort.upperPrice}&pageNumber=${page}&pageSize=10&sortBy=${sort.sortBy}&desc=${sort.direction}&steamRating=${sort.steamRating}&metacritic=${sort.metacritic}&title=${sort.query}`
      );
      if (res.status !== 200) {
        return console.log("Failed to fetch" + res.status);
      }
      const games = await res.json();
      console.log(games);
      if (games.length > 0) {
        setGameResults(gameResults.concat(games));
        setPage(page + 1);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNextPage();
  };

  return (
    <div>
      <Head>
        <title>PC GAME DEALS - Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div className='nav-buffer'></div>
      <div className='page-container'>
        <h1>search page</h1>
        <div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <label htmlFor='search'>Search</label>
            <input
              required
              type='text'
              onChange={(e) =>
                setSort({
                  ...sort,
                  query: e.target.value,
                })
              }
            />
          </form>
        </div>
        <GameCard games={gameResults} fetchNextPage={fetchNextPage} />
      </div>
    </div>
  );
}

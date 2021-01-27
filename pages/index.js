import Head from "next/head";
import style from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";

export default function Home({ games, curPage }) {
  return (
    <div>
      <Head>
        <title>PC GAME DEALS</title>
      </Head>
      <Navbar />
      <div className='nav-buffer'></div>
      <div className='page-container'>
        <h1 className={style.title}>TOP AAA DEALS</h1>
        <GameCard games={games} curPage={curPage} />
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  let page = query.page || 0;
  let games = null;
  const curPage = page;

  try {
    const res = await fetch(
      `${process.env.FETCH_URL}&upperPrice=15&AAA=1&pageNumber=${page}&pageSize=20`
    );
    if (res.status !== 200) {
      return console.log("Failed to fetch" + res.status);
    }
    games = await res.json();
  } catch (err) {
    games = { error: { message: err.message } };
  }
  return { props: { games, curPage } };
};

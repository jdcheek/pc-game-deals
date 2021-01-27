import Head from "next/head";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import style from "../styles/Browse.module.css";

export default function Browse(props) {
  return (
    <div>
      <Head>
        <title>PC GAME DEALS - Browse</title>
      </Head>
      <Navbar />
      <div className='nav-buffer'></div>
      <div className='page-container'>
        <h1 className={style.title}>BROWSE TITLES</h1>
        <GameCard games={props.games} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.FETCH_URL}&upperPrice=15`);
    const data = await res.json();
    return {
      props: { games: data },
    };
  } catch (error) {
    console.log(error);
  }
}

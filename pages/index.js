import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>PC GAME DEALS</title>
      </Head>
      <Navbar />
      <div className='page-container'>
        <h1>home page</h1>
        <div>
          <GameCard games={props.games} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&AAA=1`
  );
  const data = await res.json();

  return {
    props: { games: data },
  };
}

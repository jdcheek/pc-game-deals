import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>PC GAME DEALS</title>
      </Head>
      <Navbar />
      <div className='page-container'>
        <h1>home page</h1>
      </div>
    </div>
  );
}

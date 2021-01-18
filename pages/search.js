import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Search() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PC GAME DEALS - Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <h1>search page</h1>
    </div>
  );
}

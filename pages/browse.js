import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";

export default function Search() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PC GAME DEALS - Browse</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <h1>browse page</h1>
    </div>
  );
}

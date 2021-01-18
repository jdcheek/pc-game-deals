import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Search() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PC GAME DEALS - Browse</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>browse page</h1>
      <Link href='/search'>
        <a>search</a>
      </Link>
      <Link href='/'>
        <a>home</a>
      </Link>
    </div>
  );
}

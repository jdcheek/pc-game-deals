import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Search() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PC GAME DEALS - Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>search page</h1>
      <Link href='/'>
        <a>home</a>
      </Link>
      <Link href='/browse'>
        <a>browse</a>
      </Link>
    </div>
  );
}

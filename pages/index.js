import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PC GAME DEALS</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>home page</h1>
      <Link href='/search'>
        <a>search</a>
      </Link>
      <Link href='/browse'>
        <a>browse</a>
      </Link>
    </div>
  );
}

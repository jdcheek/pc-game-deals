import Head from "next/head";
import Navbar from "../components/Navbar";

export default function Search() {
  return (
    <div>
      <Head>
        <title>PC GAME DEALS - Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />

      <div className='page-container'>
        <h1>search page</h1>
      </div>
    </div>
  );
}

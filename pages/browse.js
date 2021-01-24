import Head from "next/head";
import Navbar from "../components/Navbar";

export default function Search() {
  return (
    <div>
      <Head>
        <title>PC GAME DEALS - Browse</title>
      </Head>
      <Navbar />
      <div className='nav-buffer'></div>
      <div className='page-container'>
        <h1>browse page</h1>
      </div>
    </div>
  );
}

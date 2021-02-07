import "../styles/globals.css";
import NavBar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <div className='nav-buffer'></div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

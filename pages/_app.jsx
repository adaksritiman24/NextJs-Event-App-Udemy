import "../styles/globals.css";
import Head from "next/head"
import LayoutComponent from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <LayoutComponent>
      <Head>
        <title>Events Application</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}

export default MyApp;

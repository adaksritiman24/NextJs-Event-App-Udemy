import "../styles/globals.css";
import LayoutComponent from "../components/layout/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <LayoutComponent>
      <Head>
        <meta name="viewport" content="initial-scale=1.0 width=device-width"/>
      </Head>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}

export default MyApp;

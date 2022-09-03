import "../styles/globals.css";
import LayoutComponent from "../components/layout/Layout";
import Head from "next/head";
import { NotificationContextProvider } from "../store/notifiactionContext";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <LayoutComponent>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0 width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </LayoutComponent>
    </NotificationContextProvider>
  );
}

export default MyApp;

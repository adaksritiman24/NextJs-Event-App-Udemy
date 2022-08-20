import React from "react";
import Head from "next/head";
import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/EventList";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <>
      <Head>
        <title>Events Application</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <EventList items={featuredEvents}/>
      </div>
    </>
  );
};

export default HomePage;

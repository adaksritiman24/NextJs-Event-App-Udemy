import React from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/apiUtils";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();
  const { events: featuredEvents } = props;

  return (
    <>
      <Head>
          <title>Next Events</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Find a lot of great events going around the world"
          />
          <meta name="keywords" content="events event" />
      </Head>
      <div>
        <NewsletterRegistration/>
        <EventList items={featuredEvents} />
      </div>
    </>
  );
};

export const getStaticProps = async (context) => {
  const props = {
    events: [],
  };
  props.events = await getFeaturedEvents();
  return {
    props,
    revalidate : 1080,
  };
};

export default HomePage;

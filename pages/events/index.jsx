import React from "react";
import { getAllEvents } from "../../helpers/apiUtils";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { useRouter } from "next/router";
import Head from "next/head";

const AllEventsPage = (props) => {
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  const { events: allEvents } = props;
  return (
    <>
      <Head>
          <title>Events</title>
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
      <EventSearch search={findEventsHandler} />
      <EventList items={allEvents} />
    </>
  );
};

export const getStaticProps = async (context) => {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate : 120,
  };
};

export default AllEventsPage;

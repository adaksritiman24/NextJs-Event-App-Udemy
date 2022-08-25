import React from "react";
import { getAllEvents } from "../../helpers/apiUtils";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  const { events: allEvents } = props;
  return (
    <>
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

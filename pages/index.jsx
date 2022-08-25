import React from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/apiUtils";

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();
  const { events: featuredEvents } = props;

  return (
    <>
      <div>
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

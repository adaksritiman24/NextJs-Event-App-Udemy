import React from "react";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import {useRouter} from "next/router";

const AllEventsPage = () => {
  const router = useRouter();
  const findEventsHandler = (year, month)=>{
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  const allEvents = getAllEvents();
  return (
    <>
      <EventSearch search={findEventsHandler}/>
      <EventList items={allEvents} />
    </>
  );
};

export default AllEventsPage;

import { useRouter } from "next/router";
import React from "react";
import EventList from "../../components/events/EventList";
import Button from "../../components/ui/Button";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  console.log(numYear, numMonth);
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p className="center"><h3>Error 400: Bad Request</h3><Button link="/events">Back To All Events</Button></p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="center"><h3>No Events Found!</h3><Button link="/events">Back To All Events</Button></p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

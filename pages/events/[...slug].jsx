import { useRouter } from "next/router";
import React from "react";
import EventList from "../../components/events/EventList";
import Button from "../../components/ui/Button";
import { getFilteredEvents } from "../../helpers/apiUtils";

export default function FilteredEventsPage({ invalidFilter, filteredEvents }) {
  // const router = useRouter();
  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  if (invalidFilter) {
    return (
      <div className="center">
        <h3>Error 400: Bad Request</h3>
        <Button link="/events">Back To All Events</Button>
      </div>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        <h3>No Events Found!</h3>
        <Button link="/events">Back To All Events</Button>
      </div>
    );
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      // notFound : true,
      props: {
        invalidFilter: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: { filteredEvents },
  };
}

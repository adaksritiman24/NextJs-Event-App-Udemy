import React from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/eventDetails/EventSummary";
import EventLogistics from "../../components/eventDetails/EventLogistics";
import EventContent from "../../components/eventDetails/EventContent";

export default function EventDetailsPage() {
  const router = useRouter();

  const event = getEventById(router.query.eventId);

  if(!event) return <p>No Event Found!</p>
  return (
    <>
      <EventSummary title={event.title}/>
      <EventLogistics {...{...event, address : event.location}} imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

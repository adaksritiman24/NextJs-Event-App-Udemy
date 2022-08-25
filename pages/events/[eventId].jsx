import React from "react";
// import { useRouter } from "next/router";
import { getAllEvents, getEventById, getFeaturedEvents } from "../../helpers/apiUtils";
import EventSummary from "../../components/eventDetails/EventSummary";
import EventLogistics from "../../components/eventDetails/EventLogistics";
import EventContent from "../../components/eventDetails/EventContent";
import Button from "../../components/ui/Button";

export default function EventDetailsPage(props) {
  // const router = useRouter();

  const { event } = props;

  if (!event)
    return (
      <div className="center">
        <h3>Event dosen't Exists!</h3>
        <Button link="/events">Back To All Events</Button>
      </div>
    );
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        {...{ ...event, address: event.location }}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate : 60,
  };
};

export const getStaticPaths = async (context) => {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: "blocking",
  };
};

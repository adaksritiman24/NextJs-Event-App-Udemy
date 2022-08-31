import React from "react";
// import { useRouter } from "next/router";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "../../helpers/apiUtils";
import EventSummary from "../../components/eventDetails/EventSummary";
import EventLogistics from "../../components/eventDetails/EventLogistics";
import EventContent from "../../components/eventDetails/EventContent";
import Button from "../../components/ui/Button";
import Head from "next/head";
import Comments from "../../components/input/comments";

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
      <Head>
          <title>{event.title}</title>
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
      <EventSummary title={event.title} />
      <EventLogistics
        {...{ ...event, address: event.location }}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments id={event.id}/>
    </>
  );
}

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      event: event ? event : null,
    },
    revalidate: 60,
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

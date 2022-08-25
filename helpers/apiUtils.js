import { URL } from "../constants/baseUrl";

export const getAllEvents = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  const events = Object.keys(data).map((eventid) => ({
    id: eventid,
    ...data[eventid],
  }));
  return events;
};

export const getFeaturedEvents = async () => {
  return (await getAllEvents()).filter((event) => event.isFeatured === true);
};

export const getEventById = async (id) => {
  return (await getAllEvents()).find((event) => event.id === id);
};

export const getFilteredEvents =async(dateFilter)=> {
  const { year, month } = dateFilter;

  let filteredEvents = (await getAllEvents()).filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

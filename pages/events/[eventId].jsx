import React from 'react'
import { useRouter } from 'next/router'

export default function EventDetailsPage() {
    const router = useRouter();
  return (
    <h1>Event Details: {router.query.eventId}</h1>
  )
}

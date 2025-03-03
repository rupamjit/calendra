"use client";

import { getUserEvents } from "@/actions/event";
import CreateEventDrawer from "@/components/CreateEventDrawer";
import EventCard from "@/components/EventCard";
import React, { useEffect, useState } from "react";
import { Event } from "@/Types";

const CreateEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userName,setUserName] = useState("")
 
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await getUserEvents();
        setEvents(response.events);
        setUserName(response?.user?.userName)
        // console.log(response?.user?.userName)
        // console.log(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getEvents();
  }, []);

  return (
    <div >
      <div className="flex sm:justify-center items-center pb-5">
        <CreateEventDrawer />
      </div>
      <div className="sm:grid-cols-1 gap-3 grid lg:grid-cols-3  overflow-y-auto p-2 pb-5">
        {events.length > 0
        ? events.map((event, index) => <EventCard key={index} userName={userName} event={event} />)
        : "Loading ..."}
      </div>
    </div>
  );
};

export default CreateEvent;

import React from "react";
import { useState } from "react";
import google from '../../assets/googleLogo1.png';
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker";

function SignedIn() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession(); // current active tokens are stored in the session
  const supabase = useSupabaseClient(); // talk to supabase
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>;
  }

  async function signOut() {
    await supabase.auth.signOut();
  }
  async function createCalendarEvent() {
    if (!session?.provider_token) {
      alert("No Google access token found");
      return;
    }

    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // e.g., Asia/Calcutta
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // e.g., Asia/Calcutta
      },
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session.provider_token, // access token for google
            "Content-Type": "application/json", // Ensure content type is set
          },
          body: JSON.stringify(event),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log(data);
      alert("Event created");
      setEventDescription('')
      setEventName('')
      setStart(new Date())
      setEnd(new Date())

    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event: " + error.message);
    }
  }
  const handleStartChange = (date) => {
    setStart(date);
    setEnd(date);
  };
  // console.log(session);
  // console.log(start);
  // console.log(end);
  // console.log(eventName);
  // console.log(eventDescription);
  return (
    <>
      <h2 className="text-4xl font-semibold my-2">Hello, Set a reminder</h2>
      <p className="text-2xl my-3">Start of your event: </p>
      <DateTimePicker onChange={handleStartChange} value={start} format="dd-MM-yyyy h:mm a"/>
      <p className="text-2xl my-3">End of your event: </p>
      <DateTimePicker onChange={setEnd} value={end} format="dd-MM-yyyy h:mm a" />

      <p className="text-2xl my-3">Event Name:</p>
      <input
        type="text"
        className="text-xl px-5 py-2 rounded-md bg-[#686868] "
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <p className="text-2xl my-3">Event Description:</p>
      <input
        type="text"
        className="text-xl px-5 py-2 rounded-md bg-[#686868] "
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />
      <p></p>
      <button className="my-5 shadow-lg shadow-gray-500/50" onClick={() => createCalendarEvent()}>
        Create calendar event
      </button>
      <hr />
      <button className='shadow-lg shadow-blue-500/50 flex justify-center items-center px-4 mx-auto mt-5' onClick={() => signOut()}>
      <img src={google} alt="g" className='h-8 w-8 mr-3' />
        Sign Out
      </button>
    </>
  );
}

export default SignedIn;

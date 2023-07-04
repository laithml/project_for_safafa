import { db } from "../config/firebase";
import {collection, getDocs, doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";

export async function getEvents() {
  const refEvents = collection(db, "events");
  let eventList = [];

  await getDocs(refEvents).then((doc) => {
    doc.forEach((event) => {
      eventList.push(event.data());
    });
  });

  return eventList;
}

export async function joinEvent(userId, eventId) {
  console.log(`userId: ${userId}, eventId: ${eventId}`); // Debugging line

  const eventDocRef = doc(db, "events", eventId);
  const attendeesArrayUnion = arrayUnion(userId);

  await updateDoc(eventDocRef, { attendees: attendeesArrayUnion });

  const userDocRef = doc(db, "users", userId);
  const joinedEventsArrayUnion = arrayUnion(eventId);

  await updateDoc(userDocRef, {
    joinedEvents: joinedEventsArrayUnion,
  });
}



export async function getUserEvents(userId) {
  let userEvents = [];

  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const joinedEventIds = userData.joinedEvents || [];

    for(let i = 0; i < joinedEventIds.length; i++) {
      const eventDocRef = doc(db, "events", joinedEventIds[i]); // Use events instead of Events
      const eventDoc = await getDoc(eventDocRef);

      if (eventDoc.exists()) {
        userEvents.push(eventDoc.data());
      } else {
        console.log(`No document exists for the event ID ${joinedEventIds[i]}`);
      }
    }
  }

  return userEvents;
}



